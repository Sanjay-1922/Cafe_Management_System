//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using CafeManagementSystem.Data;
//using CafeManagementSystem.DTOs;
//using CafeManagementSystem.Models;
//using System.Linq;
//using System.Security.Cryptography;
//using System.Text;

//namespace CafeManagementSystem.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class UserController : ControllerBase
//    {
//        private readonly ApplicationDbContext _context;

//        public UserController(ApplicationDbContext context)
//        {
//            _context = context;
//        }

//        // ✅ Get All Users
//        [HttpGet]
//        public IActionResult GetUsers()
//        {
//            var users = _context.Users
//                .Select(u => new UserResponseDto
//                {
//                    Id = u.Id,
//                    Username = u.Username,
//                    Email = u.Email,
//                    PhoneNumber = u.PhoneNumber,
//                    Role = u.Role
//                })
//                .ToList();

//            return Ok(users);
//        }

//        // ✅ Get User by ID
//        [HttpGet("{id}")]
//        public IActionResult GetUser(int id)
//        {
//            var user = _context.Users
//                .Where(u => u.Id == id)
//                .Select(u => new UserResponseDto
//                {
//                    Id = u.Id,
//                    Username = u.Username,
//                    Email = u.Email,
//                    PhoneNumber = u.PhoneNumber,
//                    Role = u.Role
//                })
//                .FirstOrDefault();

//            if (user == null)
//                return NotFound("User not found");

//            return Ok(user);
//        }

//        // ✅ Register a New User
//        [HttpPost("register")]
//        public IActionResult Register([FromBody] UserCreateDto userDto)
//        {
//            if (!ModelState.IsValid)
//                return BadRequest(ModelState);

//            if (_context.Users.Any(u => u.Username == userDto.Username))
//                return BadRequest("Username already exists");

//            if (_context.Users.Any(u => u.Email == userDto.Email))
//                return BadRequest("Email already in use");

//            var hashedPassword = HashPassword(userDto.Password);

//            var user = new User
//            {
//                Username = userDto.Username,
//                Email = userDto.Email,
//                PhoneNumber = userDto.PhoneNumber,
//                Role = userDto.Role,
//                PasswordHash = hashedPassword
//            };

//            _context.Users.Add(user);
//            _context.SaveChanges();

//            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, new UserResponseDto
//            {
//                Id = user.Id,
//                Username = user.Username,
//                Email = user.Email,
//                PhoneNumber = user.PhoneNumber,
//                Role = user.Role
//            });
//        }

//        // ✅ User Login
//        [HttpPost("login")]
//        public IActionResult Login([FromBody] UserLoginDto loginDto)
//        {
//            var user = _context.Users.FirstOrDefault(u => u.Username == loginDto.Username);
//            if (user == null || !VerifyPassword(loginDto.Password, user.PasswordHash))
//                return Unauthorized("Invalid username or password");

//            return Ok(new
//            {
//                message = "Login successful",
//                user = new UserResponseDto
//                {
//                    Id = user.Id,
//                    Username = user.Username,
//                    Email = user.Email,
//                    PhoneNumber = user.PhoneNumber,
//                    Role = user.Role
//                }
//            });
//        }

//        // ✅ Update User Information
//        [HttpPut("{id}")]
//        public IActionResult UpdateUser(int id, [FromBody] UserCreateDto userDto)
//        {
//            if (!ModelState.IsValid)
//                return BadRequest(ModelState);

//            var user = _context.Users.Find(id);
//            if (user == null)
//                return NotFound("User not found");

//            user.Username = userDto.Username;
//            user.Email = userDto.Email;
//            user.PhoneNumber = userDto.PhoneNumber;
//            user.Role = userDto.Role;

//            if (!string.IsNullOrWhiteSpace(userDto.Password))
//                user.PasswordHash = HashPassword(userDto.Password);

//            _context.Users.Update(user);
//            _context.SaveChanges();

//            return NoContent();
//        }

//        // ✅ Delete User
//        [HttpDelete("{id}")]
//        public IActionResult DeleteUser(int id)
//        {
//            var user = _context.Users.Find(id);
//            if (user == null)
//                return NotFound("User not found");

//            _context.Users.Remove(user);
//            _context.SaveChanges();

//            return NoContent();
//        }

//        // ✅ Password Hashing Method
//        private string HashPassword(string password)
//        {
//            using (var sha256 = SHA256.Create())
//            {
//                var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
//                return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
//            }
//        }

//        // ✅ Verify Hashed Password
//        private bool VerifyPassword(string password, string storedHash)
//        {
//            var hash = HashPassword(password);
//            return hash == storedHash;
//        }
//    }
//}
