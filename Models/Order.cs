using System;

using System.Collections.Generic;

using System.ComponentModel.DataAnnotations;

namespace CafeManagementSystem.Models

{

    public class Order

    {

        [Key]

        public int OrderId { get; set; } // Primary key named OrderId

        [Required]

        public int CustomerId { get; set; }

        // Navigation property for Customer (assume Customer model exists)

        public Customer Customer { get; set; }

        public DateTime OrderDate { get; set; } = DateTime.UtcNow;

        public decimal TotalAmount { get; set; }

        public bool IsPaid { get; set; } = false;

        [Required]

        [MaxLength(20)]

        public string Status { get; set; } = "Not Ready"; // e.g., "Not Ready", "Ready", "Completed"

        // Navigation property: An Order can have multiple OrderItems

        public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();

        // Navigation properties for Payment and Token

        public Payment Payment { get; set; }

        public Token Token { get; set; }

    }

}