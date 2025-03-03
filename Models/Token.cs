using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
namespace CafeManagementSystem.Models
{
    public class Token
    {
        public int Id { get; set; } // Changed from TokenId to Id
        public int OrderId { get; set; }
        public Order Order { get; set; }
        public string TokenNumber { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; } // Changed from IssuedAt to CreatedAt
    }

}