using Microsoft.AspNetCore.Mvc;

using System;

using CafeManagementSystem.Services;
using Microsoft.AspNetCore.Authorization;

namespace CafeManagementSystem.Controllers

{
    [Authorize(Roles = "Owner")]
    [Route("api/[controller]")]

    [ApiController]

    public class CustomerReportController : ControllerBase

    {

        private readonly CustomerReportService _reportService;

        public CustomerReportController(CustomerReportService reportService)

        {

            _reportService = reportService;

        }

        // GET: api/CustomerReport/daily-summary?date=YYYY-MM-DD

        // Returns a summary report of customers for the given date.

        [HttpGet("daily-summary")]

        public IActionResult GetDailyCustomerSummary([FromQuery] DateTime date)

        {

            if (date == default)

                return BadRequest("Invalid date.");

            var summaryReport = _reportService.GetDailyCustomerSummaryReport(date);

            return Ok(summaryReport);

        }

        // GET: api/CustomerReport/order-report?date=YYYY-MM-DD&customerName=John (optional customerName filter)

        // Returns a detailed order report for each customer on the given date.

        [HttpGet("order-report")]

        public IActionResult GetCustomerOrderReport([FromQuery] DateTime date, [FromQuery] string customerName = null)

        {

            if (date == default)

                return BadRequest("Invalid date.");

            var detailedReport = _reportService.GetCustomerOrderReport(date, customerName);

            return Ok(detailedReport);

        }

    }

}