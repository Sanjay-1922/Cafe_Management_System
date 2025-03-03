using System.ComponentModel.DataAnnotations;

namespace CafeManagementSystem.DTOs

{

    // DTO used when creating or updating a menu item.

    public class MenuItemCreateDto

    {

        [Required]

        [MaxLength(100)]

        public string Name { get; set; }

        [Required]

        public decimal Price { get; set; }

        [Required]

        [MaxLength(50)]

        public string Category { get; set; } // e.g., "Beverages", "Snacks", etc.

    }

    // DTO used for returning menu item details.

    //public class MenuItemResponseDto

    //{

    //    public int MenuItemId { get; set; }

    //    public string Name { get; set; }

    //    public decimal Price { get; set; }

    //    public string Category { get; set; }

    //}

}