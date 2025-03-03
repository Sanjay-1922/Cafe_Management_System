using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CafeManagementSystem.Models
{
    public class MenuItem
    {
        [Key]
        public int MenuItemId { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; }

        [Required]
        public decimal Price { get; set; }

        // You can store the category name here as a string or use a foreign key.
        // In this example, we use a foreign key to Category.
        [Required]
        public int CategoryId { get; set; }
        public Category Category { get; set; }

        // Navigation property: One menu item can appear in many order items.
        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

        // Navigation property: One menu item can be in many cart items.
        public ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
    }
}
