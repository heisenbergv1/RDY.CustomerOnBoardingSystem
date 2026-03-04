// \src\Application\Commands\CreateCustomerHandler.cs
using Application.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Commands;

public sealed record CreateCustomerCommand(
    string FirstName,
    string LastName,
    string Email,
    string? PhoneNumber) : IRequest<CreateCustomerResponse>;

public sealed record CreateCustomerResponse(bool Success, int CustomerId);

public sealed class CreateCustomerHandler : IRequestHandler<CreateCustomerCommand, CreateCustomerResponse>
{
    private readonly ICustomerRepository _repository;

    public CreateCustomerHandler(ICustomerRepository repository)
    {
        _repository = repository;
    }

    public async Task<CreateCustomerResponse> Handle(CreateCustomerCommand request, CancellationToken cancellationToken)
    {
        var customer = new Customer
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            PhoneNumber = request.PhoneNumber,
            DateCreated = DateTime.UtcNow
        };

        throw new Exception("TEST Simulated exception for testing purposes.");

        await _repository.AddAsync(customer, cancellationToken);

        return new CreateCustomerResponse(true, customer.Id);
    }
}
