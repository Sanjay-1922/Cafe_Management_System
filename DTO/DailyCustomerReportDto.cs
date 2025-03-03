namespace CafeManagementSystem.DTOs

{

    // Summary report: Each customer with total orders and total spending.

    public class DailyCustomerReportDto

    {

        public int CustomerId { get; set; }

        public string CustomerName { get; set; }

        public int OrderCount { get; set; }

        public decimal TotalSpent { get; set; }

    }

}