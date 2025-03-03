using Microsoft.AspNetCore.Mvc;
using CafeManagementSystem.Data;
using CafeManagementSystem.DTOs;
using CafeManagementSystem.Models;
using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace CafeManagementSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Owner")] // Only owners can access this controller
    public class OrderController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/Order
        [HttpPost]
        public IActionResult CreateOrder([FromBody] OrderCreateDto orderDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var order = new Order
            {
                CustomerId = orderDto.CustomerId,
                OrderDate = DateTime.UtcNow,
                Status = "Pending",
                IsPaid = false,
                //OrderItems = new List<OrderItem>()
            };

            decimal total = 0;

            foreach (var itemDto in orderDto.OrderItems)
            {
                var menuItem = _context.MenuItems.FirstOrDefault(m => m.MenuItemId == itemDto.MenuItemId);
                if (menuItem == null)
                {
                    return NotFound($"Menu item with id {itemDto.MenuItemId} not found.");
                }

                var orderItem = new OrderItem
                {
                    MenuItemId = itemDto.MenuItemId,
                    Quantity = itemDto.Quantity,
                    Price = menuItem.Price
                };

                total += orderItem.Price * orderItem.Quantity;
                order.OrderItems.Add(orderItem);
            }

            order.TotalAmount = total;

            _context.Orders.Add(order);
            _context.SaveChanges();

            var response = new OrderResponseDto
            {
                OrderId = order.OrderId,
                CustomerId = order.CustomerId,
                OrderDate = order.OrderDate,
                TotalAmount = order.TotalAmount,
                IsPaid = order.IsPaid,
                Status = order.Status,
                //OrderItems = order.OrderItems.Select(oi => new OrderItemResponseDto
                //{
                //    Id = oi.Id,
                //    MenuItemId = oi.MenuItemId,
                //    ItemName = _context.MenuItems.FirstOrDefault(m => m.MenuItemId == oi.MenuItemId)?.Name,
                //    Quantity = oi.Quantity,
                //    Price = oi.Price,
                //    TotalPrice = oi.Price * oi.Quantity
                //}).ToList()
            };

            return CreatedAtAction(nameof(GetOrder), new { id = order.OrderId }, response);
        }

        // GET: api/Order/{id}
        [HttpGet("{id}")]
        public IActionResult GetOrder(int id)
        {
            var order = _context.Orders.FirstOrDefault(o => o.OrderId == id);

            if (order == null)
                return NotFound("Order not found.");

            var response = new OrderResponseDto
            {
                OrderId = order.OrderId,
                CustomerId = order.CustomerId,
                OrderDate = order.OrderDate,
                TotalAmount = order.TotalAmount,
                IsPaid = order.IsPaid,
                Status = order.Status,
                //OrderItems = order.OrderItems.Select(oi => new OrderItemResponseDto
                //{
                //    Id = oi.Id,
                //    MenuItemId = oi.MenuItemId,
                //    ItemName = _context.MenuItems.FirstOrDefault(m => m.MenuItemId == oi.MenuItemId)?.Name,
                //    Quantity = oi.Quantity,
                //    Price = oi.Price,
                //    TotalPrice = oi.Price * oi.Quantity
                //}).ToList()
            };

            return Ok(response);
        }

        // GET: api/Order
        [HttpGet]
        public IActionResult GetAll()
        {
            var orders = _context.Orders
                .Include(o => o.OrderItems)
                .ThenInclude(oi => oi.MenuItem)
                .Select(order => new OrderResponseDto
                {
                    OrderId = order.OrderId,
                    CustomerId = order.CustomerId,
                    OrderDate = order.OrderDate,
                    TotalAmount = order.TotalAmount,
                    IsPaid = order.IsPaid,
                    Status = order.Status
                
                //    OrderItems = order.OrderItems.Select(oi => new OrderItemResponseDto
                //    {
                //        Id = oi.Id,
                //        MenuItemId = oi.MenuItemId,
                //        ItemName = oi.MenuItem.Name,
                //        Quantity = oi.Quantity,
                //        Price = oi.Price,
                //        TotalPrice = oi.Price * oi.Quantity
                //    }).ToList()
                }).ToList();

            return Ok(orders);
        }

        // PUT: api/Order/{id}/status
        [HttpPut("{id}/status")]
        public IActionResult UpdateOrderStatus(int id, [FromBody] string status)
        {
            var order = _context.Orders.FirstOrDefault(o => o.OrderId == id);

            if (order == null)
                return NotFound("Order not found.");

            order.Status = status;
            _context.Orders.Update(order);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
