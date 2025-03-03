using System;

using System.Collections.Generic;

namespace CafeManagementSystem.DTOs

{

    public class CustomerOrderReportDto

    {

        public int CustomerId { get; set; }

        public string CustomerName { get; set; }

        // List of orders placed by this customer on the selected day.

        public List<CustomerOrderDto> Orders { get; set; }

        // Aggregated total amount from all orders for this customer.

        public decimal TotalAmount { get; set; }

    }

    public class CustomerOrderDto

    {

        public int OrderId { get; set; }

        public DateTime OrderDate { get; set; }

        // Total amount for this order (either pre-calculated in Order.TotalAmount or computed from items)

        public decimal OrderTotal { get; set; }

        // Details for each item in the order.

        public List<CustomerOrderItemDto> OrderItems { get; set; }

    }

    public class CustomerOrderItemDto

    {

        public string MenuItemName { get; set; }

        public int Quantity { get; set; }

        public decimal PricePerUnit { get; set; }

        public decimal TotalPrice { get; set; }

    }

}