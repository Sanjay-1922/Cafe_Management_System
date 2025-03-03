using System.ComponentModel.DataAnnotations;

namespace CafeManagementSystem.DTOs
{
    public class UserCreateDto
    {
        [Required, MaxLength(50)]
        public string Username { get; set; }

        [Required, EmailAddress, MaxLength(100)]
        public string Email { get; set; }

        [Required, Phone, MaxLength(20)]
        public string PhoneNumber { get; set; }

        [Required, MaxLength(20)]
        public string Role { get; set; }  // "Admin" or "Staff"

        [Required, MinLength(6)]
        public string Password { get; set; }
    }
}