using System.Collections.Generic;

using System.ComponentModel.DataAnnotations;

namespace CafeManagementSystem.DTOs

{

    // DTO for adding/updating a cart item.

    public class CartItemCreateDto

    {

        [Required]

        public int CustomerId { get; set; }  // Identifies the customer's cart

        [Required]

        public int MenuItemId { get; set; }  // The menu item to add

        [Required]

        [Range(1, int.MaxValue, ErrorMessage = "Quantity must be at least 1.")]

        public int Quantity { get; set; }

    }

    // DTO for returning individual cart item details.

    public class CartItemResponseDto

    {

        public int CartItemId { get; set; }

        public int MenuItemId { get; set; }

        public string MenuItemName { get; set; }

        public int Quantity { get; set; }

        public decimal PricePerUnit { get; set; }

        public decimal TotalPrice { get; set; }  // PricePerUnit * Quantity

    }

    // DTO for returning overall cart details.

    public class CartResponseDto

    {

        public int CartId { get; set; }

        public int CustomerId { get; set; }

        public List<CartItemResponseDto> Items { get; set; }

        public decimal TotalAmount { get; set; }

    }

}