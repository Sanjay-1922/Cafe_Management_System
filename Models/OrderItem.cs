using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace CafeManagementSystem.Models
{
    public class OrderItem
    {
        [Key]
        public int Id { get; set; }
        // Foreign key to Order
        [Required]
        [ForeignKey("Order")]
        public int OrderId { get; set; }
        public Order Order { get; set; }
        // Foreign key to MenuItem
        [Required]
        [ForeignKey("MenuItem")]
        public int MenuItemId { get; set; }
        public MenuItem MenuItem { get; set; }
        [Required]
        public int Quantity { get; set; }
        // Price per unit at the time of order (or you could store TotalPrice = Quantity * Price)
        [Required]
        public decimal Price { get; set; }
    }
}