using System.Collections.Generic;

using System.ComponentModel.DataAnnotations;

namespace CafeManagementSystem.DTOs

{

    // DTO for creating or updating a category

    public class CategoryCreateDto

    {

        [Required]

        [MaxLength(100)]

        public string Name { get; set; }

    }

    // DTO for returning category details

    public class CategoryResponseDto

    {

        public int CategoryId { get; set; }

        public string Name { get; set; }

        // Count of menu items in this category

        public int ItemsCount { get; set; }

        // (Optional) List of menu items in the category.

        public List<MenuItemResponseDto> MenuItems { get; set; }

    }

    // DTO for returning menu item details (used in CategoryResponseDto)

    public class MenuItemResponseDto

    {

        public int MenuItemId { get; set; }

        public string Name { get; set; }

        public decimal Price { get; set; }

        // You can also include Category here if needed:

        public string Category { get; set; }

    }

}