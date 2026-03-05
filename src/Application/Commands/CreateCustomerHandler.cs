// \src\Application\Commands\CreateCustomerHandler.cs
using Application.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Commands;

public sealed record CreateCustomerCommand(
    string FirstName,
    string LastName,
    string Email,
    string PhoneNumber,
    string SignatureBase64) : IRequest<CreateCustomerResponse>;

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
        if (!string.IsNullOrWhiteSpace(request.SignatureBase64))
        {
            try
            {
                var bytes = Convert.FromBase64String(request.SignatureBase64);
                if (bytes.Length == 0)
                    throw new InvalidOperationException("Signature cannot be empty");
            }
            catch (FormatException)
            {
                throw new InvalidOperationException("Signature must be a valid Base64 string");
            }
        }

        var customer = new Customer
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            PhoneNumber = request.PhoneNumber,
            SignatureBase64 = request.SignatureBase64,
            DateCreated = DateTime.UtcNow
        };

        await _repository.AddAsync(customer, cancellationToken);

        return new CreateCustomerResponse(true, customer.Id);
    }
}
