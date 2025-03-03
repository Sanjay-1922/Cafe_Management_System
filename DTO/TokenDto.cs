using System;
using System.ComponentModel.DataAnnotations;
namespace CafeManagementSystem.DTOs
{
    // Used when creating a token
    public class TokenCreateDto
    {
        [Required]
        public int OrderId { get; set; }
    }
    // Used for updating the token status
    public class TokenUpdateDto
    {
        [Required]
        [MaxLength(20)]
        public string Status { get; set; } // For example: "Not Ready", "Ready", "Completed"
    }
    // Used for sending token details in the response
    public class TokenResponseDto
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public string TokenNumber { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}