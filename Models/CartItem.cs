﻿using System.ComponentModel.DataAnnotations;

using System.ComponentModel.DataAnnotations.Schema;

namespace CafeManagementSystem.Models

{

    public class CartItem

    {

        [Key]

        public int Id { get; set; }

        [Required]

        [ForeignKey("Cart")]

        public int CartId { get; set; }

        public Cart Cart { get; set; }

        [Required]

        [ForeignKey("MenuItem")]

        public int MenuItemId { get; set; }

        public MenuItem MenuItem { get; set; }

        [Required]

        public int Quantity { get; set; }

        [Required]

        public decimal TotalPrice { get; set; } // MenuItem Price * Quantity

    }

}