using Microsoft.AspNetCore.Mvc;

using System.Linq;

using System.Collections.Generic;

using CafeManagementSystem.Data;

using CafeManagementSystem.Models;

using CafeManagementSystem.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace CafeManagementSystem.Controllers

{
    [Authorize(Roles = "Owner,Staff")]
    [Route("api/[controller]")]

    [ApiController]

    public class CategoryController : ControllerBase

    {

        private readonly ApplicationDbContext _context;

        public CategoryController(ApplicationDbContext context)

        {

            _context = context;

        }

        // GET: api/Category

        [HttpGet]

        public IActionResult GetCategories()

        {

            var categories = _context.Categories

                .Select(c => new CategoryResponseDto

                {

                    CategoryId = c.CategoryId,

                    Name = c.Name,

                    ItemsCount = c.MenuItems.Count,

                    // Optional: include details of each menu item

                    MenuItems = c.MenuItems.Select(m => new MenuItemResponseDto

                    {

                        MenuItemId = m.MenuItemId,

                        Name = m.Name,

                        Price = m.Price,

                        Category = m.Category.Name

                    }).ToList()

                })

                .ToList();

            return Ok(categories);

        }

        // GET: api/Category/{id}

        [HttpGet("{id}")]

        public IActionResult GetCategory(int id)

        {

            var category = _context.Categories

                .Where(c => c.CategoryId == id)

                .Select(c => new CategoryResponseDto

                {

                    CategoryId = c.CategoryId,

                    Name = c.Name,

                    ItemsCount = c.MenuItems.Count,

                    MenuItems = c.MenuItems.Select(m => new MenuItemResponseDto

                    {

                        MenuItemId = m.MenuItemId,

                        Name = m.Name,

                        Price = m.Price,

                        Category = m.Category.Name

                    }).ToList()

                })

                .FirstOrDefault();

            if (category == null)

                return NotFound("Category not found.");

            return Ok(category);

        }

        // POST: api/Category

        [HttpPost]

        public IActionResult CreateCategory([FromBody] CategoryCreateDto categoryDto)

        {

            if (!ModelState.IsValid)

                return BadRequest(ModelState);

            var category = new Category

            {

                Name = categoryDto.Name

            };

            _context.Categories.Add(category);

            _context.SaveChanges();

            // Prepare response with empty MenuItems list and count 0

            var response = new CategoryResponseDto

            {

                CategoryId = category.CategoryId,

                Name = category.Name,

                ItemsCount = 0,

                MenuItems = new List<MenuItemResponseDto>()

            };

            return CreatedAtAction(nameof(GetCategory), new { id = category.CategoryId }, response);

        }

        // PUT: api/Category/{id}

        [HttpPut("{id}")]

        public IActionResult UpdateCategory(int id, [FromBody] CategoryCreateDto categoryDto)

        {

            if (!ModelState.IsValid)

                return BadRequest(ModelState);

            var category = _context.Categories.FirstOrDefault(c => c.CategoryId == id);

            if (category == null)

                return NotFound("Category not found.");

            category.Name = categoryDto.Name;

            _context.Categories.Update(category);

            _context.SaveChanges();

            return NoContent();

        }

        // DELETE: api/Category/{id}

        [HttpDelete("{id}")]

        public IActionResult DeleteCategory(int id)

        {

            var category = _context.Categories.FirstOrDefault(c => c.CategoryId == id);

            if (category == null)

                return NotFound("Category not found.");

            _context.Categories.Remove(category);

            _context.SaveChanges();

            return NoContent();

        }

    }

}