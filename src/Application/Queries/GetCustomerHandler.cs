// Application/Queries/CustomerQuery.cs
using Application.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Queries;

public sealed record CustomerQuery(int CustomerId) : IRequest<GetCustomerResponse?>;

public sealed record GetCustomerResponse(Customer Customer);

public sealed class GetCustomerHandler : IRequestHandler<CustomerQuery, GetCustomerResponse?>
{
    private readonly ICustomerRepository _customerRepository;

    public GetCustomerHandler(ICustomerRepository customerRepository)
    {
        _customerRepository = customerRepository;
    }

    public async Task<GetCustomerResponse?> Handle(CustomerQuery request, CancellationToken cancellationToken)
    {
        var customer = await _customerRepository.GetByIdAsync(request.CustomerId, cancellationToken);

        if (customer is null) return null;
            
        return new GetCustomerResponse(customer);
    }
}