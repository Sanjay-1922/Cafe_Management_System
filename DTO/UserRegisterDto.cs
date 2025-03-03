using System.ComponentModel.DataAnnotations;

namespace CafeManagementSystem.DTOs

{

    public class UserRegisterDto

    {

        [Required, MaxLength(50)]

        public string Username { get; set; }

        [Required, EmailAddress, MaxLength(100)]

        public string Email { get; set; }

        [Required, Phone, MaxLength(20)]

        public string PhoneNumber { get; set; }

        [Required, MinLength(6)]

        public string Password { get; set; }

        [Required, MaxLength(20)]

        public string Role { get; set; }  // e.g., "Admin" or "Staff"

    }

}