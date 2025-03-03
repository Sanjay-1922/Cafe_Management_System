using System.ComponentModel.DataAnnotations;
namespace CafeManagementSystem.DTOs
{
    public class PaymentRequestDto
    {
        [Required]
        public int OrderId { get; set; }
        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Amount must be greater than zero.")]
        public decimal Amount { get; set; }
        [Required]
        [MaxLength(50)]
        public string PaymentMethod { get; set; } // e.g., "Cash", "Card", "Digital"
    }
}