using Microsoft.AspNetCore.Mvc;
using CafeManagementSystem.Data;
using CafeManagementSystem.DTOs;
using CafeManagementSystem.Models;
using System.Linq;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace CafeManagementSystem.Controllers
{
    [Authorize(Roles = "Owner,Staff")]
    [Route("api/[controller]")]
    [ApiController]
    public class MenuItemController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MenuItemController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/MenuItem
        [HttpGet]
        public IActionResult GetMenuItems()
        {
            var items = _context.MenuItems
                .Select(m => new MenuItemResponseDto
                {
                    MenuItemId = m.MenuItemId,
                    Name = m.Name,
                    Price = m.Price,
                    Category = m.Category.Name
                })
                .ToList();

            return Ok(items);
        }

        // GET: api/MenuItem/{id}
        [HttpGet("{id}")]
        public IActionResult GetMenuItem(int id)
        {
            var menuItem = _context.MenuItems.FirstOrDefault(m => m.MenuItemId == id);

            if (menuItem == null)
                return NotFound("Menu item not found.");

            var response = new MenuItemResponseDto
            {
                MenuItemId = menuItem.MenuItemId,
                Name = menuItem.Name,
                Price = menuItem.Price,
                Category = menuItem.Category.Name
            };

            return Ok(response);
        }

        // POST: api/MenuItem
        [HttpPost]
        public IActionResult CreateMenuItem([FromBody] MenuItemCreateDto menuItemDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var category = _context.Categories.FirstOrDefault(c => c.Name == menuItemDto.Category);

            if (category == null)
                return BadRequest("Invalid category.");

            var menuItem = new MenuItem
            {
                Name = menuItemDto.Name,
                Price = menuItemDto.Price,
                Category = category
            };

            _context.MenuItems.Add(menuItem);
            _context.SaveChanges();

            var response = new MenuItemResponseDto
            {
                MenuItemId = menuItem.MenuItemId,
                Name = menuItem.Name,
                Price = menuItem.Price,
                Category = menuItem.Category.Name
            };

            return CreatedAtAction(nameof(GetMenuItem), new { id = menuItem.MenuItemId }, response);
        }

        // PUT: api/MenuItem/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateMenuItem(int id, [FromBody] MenuItemCreateDto menuItemDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var menuItem = _context.MenuItems.FirstOrDefault(m => m.MenuItemId == id);

            if (menuItem == null)
                return NotFound("Menu item not found.");

            var category = _context.Categories.FirstOrDefault(c => c.Name == menuItemDto.Category);

            if (category == null)
                return BadRequest("Invalid category.");

            menuItem.Name = menuItemDto.Name;
            menuItem.Price = menuItemDto.Price;
            menuItem.Category = category;

            _context.MenuItems.Update(menuItem);
            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/MenuItem/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteMenuItem(int id)
        {
            var menuItem = _context.MenuItems.FirstOrDefault(m => m.MenuItemId == id);

            if (menuItem == null)
                return NotFound("Menu item not found.");

            _context.MenuItems.Remove(menuItem);
            _context.SaveChanges();

            return NoContent();
        }
    }
}
