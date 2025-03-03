using Microsoft.AspNetCore.Mvc;
using CafeManagementSystem.DTOs;
using CafeManagementSystem.Models;
using CafeManagementSystem.Data;
using System.Linq;
using Microsoft.Extensions.Configuration;
using System;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using BCrypt.Net; // Ensure you have installed BCrypt.Net-Next

namespace CafeManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly ILogger<AuthController> _logger;

        public AuthController(ApplicationDbContext context, IConfiguration configuration, ILogger<AuthController> logger)
        {
            _context = context;
            _configuration = configuration;
            _logger = logger;
        }

        // POST: api/auth/register
        [HttpPost("register")]
        public IActionResult Register([FromBody] UserRegisterDto registerDto)
        {
            _logger.LogInformation("Register endpoint called");

            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Invalid model state for register");
                return BadRequest(ModelState);
            }

            // Check if username or email already exists
            if (_context.Users.Any(u => u.Username == registerDto.Username))
            {
                _logger.LogWarning("Username already exists: {Username}", registerDto.Username);
                return BadRequest("Username already exists.");
            }
            if (_context.Users.Any(u => u.Email == registerDto.Email))
            {
                _logger.LogWarning("Email already in use: {Email}", registerDto.Email);
                return BadRequest("Email already in use.");
            }

            // Hash the password using BCrypt
            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(registerDto.Password);
            var user = new User
            {
                Username = registerDto.Username,
                Email = registerDto.Email,
                PhoneNumber = registerDto.PhoneNumber,
                Role = registerDto.Role,
                PasswordHash = hashedPassword
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            _logger.LogInformation("User registered successfully: {Username}", user.Username);

            // Return created user info (without password)
            return CreatedAtAction(nameof(Register), new { id = user.Id }, new
            {
                user.Id,
                user.Username,
                user.Email,
                user.PhoneNumber,
                user.Role
            });
        }

        // POST: api/auth/login
        [HttpPost("login")]
        public IActionResult Login([FromBody] UserLoginDto loginDto)
        {
            _logger.LogInformation("Login endpoint called");

            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Invalid model state for login");
                return BadRequest(ModelState);
            }

            var user = _context.Users.FirstOrDefault(u => u.Username == loginDto.Username);

            if (user == null)
            {
                _logger.LogWarning("Invalid username: {Username}", loginDto.Username);
                return Unauthorized("Invalid username or password.");
            }

            // Verify password using BCrypt
            try
            {
                if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, user.PasswordHash))
                {
                    _logger.LogWarning("Invalid password for username: {Username}", loginDto.Username);
                    return Unauthorized("Invalid username or password.");
                }
            }
            catch (SaltParseException ex)
            {
                _logger.LogError(ex, "Invalid password format for username: {Username}", loginDto.Username);
                return Unauthorized("Invalid password format.");
            }

            // Generate JWT Token
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var key = Encoding.UTF8.GetBytes(jwtSettings["Key"]);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Role, user.Role),
                    new Claim("UserId", user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddHours(Convert.ToDouble(jwtSettings["ExpiresInHours"])),
                Issuer = jwtSettings["Issuer"],
                Audience = jwtSettings["Audience"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(securityToken);

            var response = new LoginResponseDto
            {
                Token = tokenString,
                UserId = user.Id,
                Username = user.Username,
                Role = user.Role,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber
            };

            _logger.LogInformation("User logged in successfully: {Username}", user.Username);

            return Ok(response);
        }
    }
}
