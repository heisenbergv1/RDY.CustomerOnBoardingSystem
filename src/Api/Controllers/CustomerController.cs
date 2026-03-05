// src\Api\Controllers\CustomerController.cs
using Api.Dtos;
using Application.Commands;
using Application.Queries;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly IMediator _mediator;

        // Inject IMediator for command and query handling
        public CustomerController(IMediator mediator)
        {
            _mediator = mediator;
        }

        /// <summary>
        /// Create a new customer.
        /// </summary>
        /// <param name="request">Customer details</param>
        /// <returns>CreateCustomerResponse with success and CustomerId</returns>
        [HttpPost]
        public async Task<ActionResult<CreateCustomerResponse>> CreateCustomer([FromBody] CreateCustomerRequest request)
        {
            if (request is null)
                return BadRequest("Request body cannot be null.");

            var command = new CreateCustomerCommand(
                request.FirstName,
                request.LastName,
                request.Email,
                request.PhoneNumber,
                request.SignatureBase64);

            var result = await _mediator.Send(command);

            return CreatedAtAction(nameof(CreateCustomer), new { id = result.CustomerId }, result);
        }

        /// <summary>
        /// Get a customer by Id.
        /// </summary>
        /// <param name="id">Customer Id</param>
        /// <returns>Single Customer object</returns>
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var query = new CustomerQuery(id);
            var result = await _mediator.Send(query);

            if (result is null || result.Customer is null)
                return NotFound($"Customer with Id {id} not found.");

            return Ok(result.Customer);
        }

        /// <summary>
        /// Get all customers.
        /// </summary>
        /// <returns>List of customers</returns>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetAllCustomers()
        {
            var query = new CustomersQuery();
            var result = await _mediator.Send(query);

            return Ok(result.Customers);
        }
    }
}