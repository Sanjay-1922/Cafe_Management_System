using System;

namespace CafeManagementSystem.DTOs

{

    public class PaymentResponseDto

    {

        public int PaymentId { get; set; }

        public int OrderId { get; set; }

        public decimal Amount { get; set; }

        public string PaymentMethod { get; set; }

        public string PaymentStatus { get; set; }

        public DateTime PaymentDate { get; set; }

        public string InvoiceNumber { get; set; }
        public string TokenNumber { get; set; }

        public int TokenId { get; set; }

    }

}