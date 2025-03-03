using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace CafeManagementSystem.Models
{
    public class Payment
    {
        [Key]
        public int PaymentId { get; set; }
        [ForeignKey("Order")]
        public int OrderId { get; set; }
        public Order Order { get; set; }  // Navigation property
        [Required, MaxLength(50)]
        public string PaymentMethod { get; set; } // Cash, Card, UPI
        [Required]
        public decimal Amount { get; set; }
        [Required, MaxLength(20)]
        public string PaymentStatus { get; set; } = "Pending"; // "Pending", "Completed", "Failed"
        public DateTime PaymentDate { get; set; } = DateTime.Now;
    }
}