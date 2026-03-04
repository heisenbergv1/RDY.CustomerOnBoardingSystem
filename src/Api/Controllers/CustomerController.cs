// src\Api\Controllers\CustomerController.cs
using Api.Dtos;
using Application.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly IMediator _mediator;

        // Inject IMediator for command handling
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
    }
}