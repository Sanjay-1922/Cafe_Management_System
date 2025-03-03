using System.ComponentModel.DataAnnotations;

namespace CafeManagementSystem.DTOs

{

    // DTO for creating an order item (used in order creation)

    public class OrderItemCreateDto

    {

        [Required]

        public int MenuItemId { get; set; }

        [Required]

        public int Quantity { get; set; }


    }

    // DTO for returning order item details

    public class OrderItemResponseDto

    {

        public int Id { get; set; }

        public int MenuItemId { get; set; }

        public string ItemName { get; set; }

        public int Quantity { get; set; }

        public decimal Price { get; set; }

        public decimal TotalPrice { get; set; } // Price * Quantity

    }

}