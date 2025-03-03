using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using CafeManagementSystem.Data;
using CafeManagementSystem.DTOs;
using CafeManagementSystem.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace CafeManagementSystem.Controllers
{
    //[Authorize(Roles = "Owner")]
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public CartController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/cart/{customerId}
        [HttpGet("{customerId}")]
        public IActionResult GetCart(int customerId)
        {
            var cart = _context.Carts
                .Include(c => c.CartItems)
                    .ThenInclude(ci => ci.MenuItem)
                .FirstOrDefault(c => c.CustomerId == customerId);

            if (cart == null)
                return NotFound("Cart not found for the customer.");

            var response = new CartResponseDto
            {
                CartId = cart.Id,
                CustomerId = cart.CustomerId,
                Items = cart.CartItems.Select(ci => new CartItemResponseDto
                {
                    CartItemId = ci.Id,
                    MenuItemId = ci.MenuItemId,
                    MenuItemName = ci.MenuItem.Name,
                    Quantity = ci.Quantity,
                    PricePerUnit = ci.MenuItem.Price,
                    TotalPrice = ci.TotalPrice
                }).ToList(),
                TotalAmount = cart.CartItems.Sum(ci => ci.TotalPrice)
            };

            return Ok(response);
        }

        // POST: api/cart/add
        [HttpPost("add")]
        public IActionResult AddCartItem([FromBody] CartItemCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var cart = _context.Carts
                .Include(c => c.CartItems)
                .FirstOrDefault(c => c.CustomerId == dto.CustomerId);

            if (cart == null)
            {
                cart = new Cart
                {
                    CustomerId = dto.CustomerId,
                    TotalPrice = 0
                };
                _context.Carts.Add(cart);
                _context.SaveChanges();
            }

            var menuItem = _context.MenuItems.FirstOrDefault(m => m.MenuItemId == dto.MenuItemId);
            if (menuItem == null)
                return NotFound("Menu item not found.");

            var cartItem = _context.CartItems.FirstOrDefault(ci => ci.CartId == cart.Id && ci.MenuItemId == dto.MenuItemId);
            if (cartItem != null)
            {
                cartItem.Quantity += dto.Quantity;
                cartItem.TotalPrice = menuItem.Price * cartItem.Quantity;
                _context.CartItems.Update(cartItem);
            }
            else
            {
                cartItem = new CartItem
                {
                    CartId = cart.Id,
                    MenuItemId = dto.MenuItemId,
                    Quantity = dto.Quantity,
                    TotalPrice = menuItem.Price * dto.Quantity
                };
                _context.CartItems.Add(cartItem);
            }

            cart.TotalPrice = _context.CartItems.Where(ci => ci.CartId == cart.Id).Sum(ci => ci.TotalPrice);
            _context.Carts.Update(cart);
            _context.SaveChanges();

            return Ok("Item added/updated in the cart.");
        }

        // PUT: api/cart/update/{cartItemId}
        [HttpPut("update/{cartItemId}")]
        public IActionResult UpdateCartItem(int cartItemId, [FromBody] CartItemCreateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var cartItem = _context.CartItems.Include(ci => ci.MenuItem)
                .FirstOrDefault(ci => ci.Id == cartItemId);
            if (cartItem == null)
                return NotFound("Cart item not found.");

            var menuItem = _context.MenuItems.FirstOrDefault(m => m.MenuItemId == dto.MenuItemId);
            if (menuItem == null)
                return NotFound("Menu item not found.");

            cartItem.Quantity = dto.Quantity;
            cartItem.TotalPrice = menuItem.Price * dto.Quantity;
            _context.CartItems.Update(cartItem);

            var cart = _context.Carts.FirstOrDefault(c => c.Id == cartItem.CartId);
            if (cart != null)
            {
                cart.TotalPrice = _context.CartItems.Where(ci => ci.CartId == cart.Id).Sum(ci => ci.TotalPrice);
                _context.Carts.Update(cart);
            }

            _context.SaveChanges();
            return Ok("Cart item updated successfully.");
        }

        // DELETE: api/cart/remove/{cartItemId}
        [HttpDelete("remove/{cartItemId}")]
        public IActionResult RemoveCartItem(int cartItemId)
        {
            var cartItem = _context.CartItems.FirstOrDefault(ci => ci.Id == cartItemId);
            if (cartItem == null)
                return NotFound("Cart item not found.");

            _context.CartItems.Remove(cartItem);
            _context.SaveChanges();

            var cart = _context.Carts.FirstOrDefault(c => c.Id == cartItem.CartId);
            if (cart != null)
            {
                cart.TotalPrice = _context.CartItems.Where(ci => ci.CartId == cart.Id).Sum(ci => ci.TotalPrice);
                _context.Carts.Update(cart);
                _context.SaveChanges();
            }

            return Ok("Cart item removed successfully.");
        }

        // DELETE: api/cart/clear/{customerId}
        [HttpDelete("clear/{customerId}")]
        public IActionResult ClearCart(int customerId)
        {
            var cart = _context.Carts.Include(c => c.CartItems)
                .FirstOrDefault(c => c.CustomerId == customerId);
            if (cart == null)
                return NotFound("Cart not found.");

            _context.CartItems.RemoveRange(cart.CartItems);
            cart.TotalPrice = 0;
            _context.Carts.Update(cart);
            _context.SaveChanges();

            return Ok("Cart cleared successfully.");
        }

        // POST: api/cart/placeorder
        [HttpPost("placeorder")]
        public IActionResult PlaceOrder(int customerId)
        {
            var cart = _context.Carts
                .Include(c => c.CartItems)
                    .ThenInclude(ci => ci.MenuItem)
                .FirstOrDefault(c => c.CustomerId == customerId);

            if (cart == null || !cart.CartItems.Any())
                return BadRequest("Cart is empty or not found.");

            var order = new Order
            {
                CustomerId = customerId,
                OrderDate = DateTime.UtcNow,
                Status = "Pending",
                IsPaid = false,
                OrderItems = new List<OrderItem>()
            };

            foreach (var cartItem in cart.CartItems)
            {
                var orderItem = new OrderItem
                {
                    MenuItemId = cartItem.MenuItemId,
                    Quantity = cartItem.Quantity,
                    Price = cartItem.MenuItem.Price
                };
                order.OrderItems.Add(orderItem);
            }

            order.TotalAmount = order.OrderItems.Sum(oi => oi.Price * oi.Quantity);

            _context.Orders.Add(order);
            _context.CartItems.RemoveRange(cart.CartItems);
            cart.TotalPrice = 0;
            _context.Carts.Update(cart);
            _context.SaveChanges();

            return Ok(new { OrderId = order.OrderId });
        }
    }
}
