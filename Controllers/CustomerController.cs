using Microsoft.AspNetCore.Mvc;

using System.Linq;

using CafeManagementSystem.Data;

using CafeManagementSystem.DTOs;

using CafeManagementSystem.Models;

namespace CafeManagementSystem.Controllers

{

    [Route("api/[controller]")]

    [ApiController]

    public class CustomerController : ControllerBase

    {

        private readonly ApplicationDbContext _context;

        public CustomerController(ApplicationDbContext context)

        {

            _context = context;

        }

        // GET: api/Customer

        [HttpGet]

        public IActionResult GetCustomers()

        {

            var customers = _context.Customers

                .Select(c => new CustomerResponseDto

                {

                    CustomerId = c.CustomerId,

                    Name = c.Name,

                    PhoneNumber = c.PhoneNumber,

                    Email = c.Email

                })

                .ToList();

            return Ok(customers);

        }

        // GET: api/Customer/{id}

        [HttpGet("{id}")]

        public IActionResult GetCustomer(int id)

        {

            var customer = _context.Customers

                .Where(c => c.CustomerId == id)

                .Select(c => new CustomerResponseDto

                {

                    CustomerId = c.CustomerId,

                    Name = c.Name,

                    PhoneNumber = c.PhoneNumber,

                    Email = c.Email

                })

                .FirstOrDefault();

            if (customer == null)

                return NotFound("Customer not found.");

            return Ok(customer);

        }

        // POST: api/Customer

        [HttpPost]

        public IActionResult CreateCustomer([FromBody] CustomerCreateDto customerDto)

        {

            if (!ModelState.IsValid)

                return BadRequest(ModelState);

            var customer = new Customer

            {

                Name = customerDto.Name,

                PhoneNumber = customerDto.PhoneNumber,

                Email = customerDto.Email

            };

            _context.Customers.Add(customer);

            _context.SaveChanges();

            var response = new CustomerResponseDto

            {

                CustomerId = customer.CustomerId,

                Name = customer.Name,

                PhoneNumber = customer.PhoneNumber,

                Email = customer.Email

            };

            return CreatedAtAction(nameof(GetCustomer), new { id = customer.CustomerId }, response);

        }

        // PUT: api/Customer/{id}

        [HttpPut("{id}")]

        public IActionResult UpdateCustomer(int id, [FromBody] CustomerCreateDto customerDto)

        {

            if (!ModelState.IsValid)

                return BadRequest(ModelState);

            var customer = _context.Customers.FirstOrDefault(c => c.CustomerId == id);

            if (customer == null)

                return NotFound("Customer not found.");

            customer.Name = customerDto.Name;

            customer.PhoneNumber = customerDto.PhoneNumber;

            customer.Email = customerDto.Email;

            _context.Customers.Update(customer);

            _context.SaveChanges();

            return NoContent();

        }

        // DELETE: api/Customer/{id}

        [HttpDelete("{id}")]

        public IActionResult DeleteCustomer(int id)

        {

            var customer = _context.Customers.FirstOrDefault(c => c.CustomerId == id);

            if (customer == null)

                return NotFound("Customer not found.");

            _context.Customers.Remove(customer);

            _context.SaveChanges();

            return NoContent();

        }

    }

}