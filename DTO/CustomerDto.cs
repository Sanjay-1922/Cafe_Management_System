using System.ComponentModel.DataAnnotations;

namespace CafeManagementSystem.DTOs

{

    // DTO used when creating or updating a customer

    public class CustomerCreateDto

    {

        [Required]

        [MaxLength(100)]

        public string Name { get; set; }

        [Required]

        [MaxLength(15)]

        public string PhoneNumber { get; set; }

        [EmailAddress]

        [MaxLength(100)]

        public string Email { get; set; }

    }

    // DTO used for returning customer details

    public class CustomerResponseDto

    {

        public int CustomerId { get; set; }

        public string Name { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

    }

}