using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CafeManagementSystem.Models
{
    public class Customer
    {
        [Key]
        public int CustomerId { get; set; }

        [Required, MaxLength(100)]
        public string Name { get; set; }

        [Required, MaxLength(15)]
        public string PhoneNumber { get; set; }

        [EmailAddress, MaxLength(100)]
        public string Email { get; set; }

        // Navigation property: A customer can have many orders.
        public ICollection<Order> Orders { get; set; } = new List<Order>();

        // Navigation property: A customer has one cart.
        public Cart Cart { get; set; }
    }
}
