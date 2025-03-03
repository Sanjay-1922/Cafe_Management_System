using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
namespace CafeManagementSystem.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required, MaxLength(50)]
        public string Username { get; set; }
        [Required]
        public string PasswordHash { get; set; }
        [Required, EmailAddress, MaxLength(100)]
        public string Email { get; set; }
        [Required, Phone, MaxLength(20)]
        public string PhoneNumber { get; set; }
        [Required, MaxLength(20)]
        public string Role { get; set; }  // e.g., "Admin" or "Staff"
                                          // Navigation property: A User can process multiple Orders.
        public ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}