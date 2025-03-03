using Microsoft.AspNetCore.Mvc;
using CafeManagementSystem.Data;
using CafeManagementSystem.DTOs;
using CafeManagementSystem.Models;
using System;
using System.Linq;
namespace CafeManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public TokenController(ApplicationDbContext context)
        {
            _context = context;
        }
        // GET: api/Token/{id}
        [HttpGet("{id}")]
        public IActionResult GetToken(int id)
        {
            var token = _context.Tokens.FirstOrDefault(t => t.Id == id);
            if (token == null)
                return NotFound("Token not found.");
            var response = new TokenResponseDto
            {
                Id = token.Id,
                OrderId = token.OrderId,
                TokenNumber = token.TokenNumber,
                Status = token.Status,
                CreatedAt = token.CreatedAt
            };
            return Ok(response);
        }
        // POST: api/Token
        // Generates a new token only after payment is completed.
        [HttpPost]
        public IActionResult CreateToken([FromBody] TokenCreateDto tokenDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var order = _context.Orders.FirstOrDefault(o => o.OrderId == tokenDto.OrderId);
            if (order == null)
                return NotFound("Order not found.");

            if (!order.IsPaid)
                return BadRequest("Token cannot be generated. Payment is pending.");

            var existingToken = _context.Tokens.FirstOrDefault(t => t.OrderId == tokenDto.OrderId);
            if (existingToken != null)
                return Conflict("A token already exists for this order.");

            var tokenNumber = $"TKN-{DateTime.Now:yyyyMMddHHmmss}-{order.OrderId}";
            var token = new Token
            {
                OrderId = order.OrderId,
                TokenNumber = tokenNumber,
                Status = "Not Ready",
                CreatedAt = DateTime.UtcNow
            };

            _context.Tokens.Add(token);
            _context.SaveChanges();

            var response = new TokenResponseDto
            {
                Id = token.Id,
                OrderId = token.OrderId,
                TokenNumber = token.TokenNumber,
                Status = token.Status,
                CreatedAt = token.CreatedAt
            };

            return CreatedAtAction(nameof(GetToken), new { id = token.Id }, response);
        }
        // PUT: api/Token/{id}
        // Updates the status of an existing token.
        [HttpPut("{id}")]
        public IActionResult UpdateToken(int id, [FromBody] TokenUpdateDto tokenUpdateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            var token = _context.Tokens.FirstOrDefault(t => t.Id == id);
            if (token == null)
                return NotFound("Token not found.");
            token.Status = tokenUpdateDto.Status;
            _context.Tokens.Update(token);
            _context.SaveChanges();
            return NoContent();
        }
        // DELETE: api/Token/{id}
        // Deletes a token.
        [HttpDelete("{id}")]
        public IActionResult DeleteToken(int id)
        {
            var token = _context.Tokens.FirstOrDefault(t => t.Id == id);
            if (token == null)
                return NotFound("Token not found.");
            _context.Tokens.Remove(token);
            _context.SaveChanges();
            return NoContent();
        }
    }
}