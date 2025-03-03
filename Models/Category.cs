using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CafeManagementSystem.Models
{
    public class Category
    {
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public ICollection<MenuItem> MenuItems { get; set; }
    }

}
