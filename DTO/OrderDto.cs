using System;

using System.Collections.Generic;

using System.ComponentModel.DataAnnotations;

namespace CafeManagementSystem.DTOs

{

    // DTO for creating an order, including a list of order items

    public class OrderCreateDto

    {

        [Required]

        public int CustomerId { get; set; }

        // List of order items to be added to this order

        [Required]

        public List<OrderItemCreateDto> OrderItems { get; set; }

    }

    // DTO for returning order details

    public class OrderResponseDto

    {

        public int OrderId { get; set; }

        public int CustomerId { get; set; }

        public DateTime OrderDate { get; set; }

        public decimal TotalAmount { get; set; }

        public bool IsPaid { get; set; }

        public string Status { get; set; }

        public List<OrderItemResponseDto> OrderItems { get; set; }

    }

}