using Microsoft.AspNetCore.Mvc;

using CafeManagementSystem.Data;

using CafeManagementSystem.Models;

using CafeManagementSystem.DTOs;

using System;

using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace CafeManagementSystem.Controllers

{

    [Route("api/[controller]")]

    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PaymentController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/Payment
        [HttpPost]
        public IActionResult ProcessPayment([FromBody] PaymentRequestDto paymentRequest)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var order = _context.Orders.Include(o => o.OrderItems).FirstOrDefault(o => o.OrderId == paymentRequest.OrderId);
            if (order == null)
                return NotFound("Order not found.");

            if (paymentRequest.Amount < order.TotalAmount)
                return BadRequest("Insufficient payment amount.");

            // Create a new Payment instance
            var payment = new Payment
            {
                OrderId = paymentRequest.OrderId,
                Amount = paymentRequest.Amount,
                PaymentMethod = paymentRequest.PaymentMethod,
                PaymentStatus = "Completed",
                PaymentDate = DateTime.UtcNow
            };

            _context.Payments.Add(payment);

            // Update the order's IsPaid attribute
            order.IsPaid = true;

            // Calculate the donation/tip amount
            var donation = paymentRequest.Amount - order.TotalAmount;
            if (donation > 0)
            {
                // Handle the donation/tip logic here (e.g., log it, store it in a separate field, etc.)
                // For simplicity, we'll just log it to the console
                Console.WriteLine($"Donation/Tip received: {donation:C}");
            }

            // Generate a token for the order
            var token = new Token
            {
                OrderId = order.OrderId,
                TokenNumber = GenerateTokenNumber(),
                Status = "Active",
                CreatedAt = DateTime.UtcNow
            };

            _context.Tokens.Add(token);
            _context.Orders.Update(order);
            _context.SaveChanges();

            // Prepare response DTO
            var response = new PaymentResponseDto
            {
                PaymentId = payment.PaymentId,
                OrderId = payment.OrderId,
                Amount = payment.Amount,
                PaymentMethod = payment.PaymentMethod,
                PaymentStatus = payment.PaymentStatus,
                PaymentDate = payment.PaymentDate,
                TokenNumber = token.TokenNumber,
                TokenId = token.Id // Set the TokenId
            };

            return Ok(response);
        }

        private string GenerateTokenNumber()
        {
            // Generate a unique token number (e.g., a GUID or a custom logic)
            return Guid.NewGuid().ToString();
        }
    }

}