// Application/Queries/CustomersQuery.cs
using Application.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Queries;

public sealed record CustomersQuery() : IRequest<GetCustomersResponse>;

public sealed record GetCustomersResponse(IEnumerable<Customer> Customers);

public sealed class GetCustomersHandler : IRequestHandler<CustomersQuery, GetCustomersResponse>
{
    private readonly ICustomerRepository _customerRepository;

    public GetCustomersHandler(ICustomerRepository customerRepository)
    {
        _customerRepository = customerRepository;
    }

    public async Task<GetCustomersResponse> Handle(CustomersQuery request, CancellationToken cancellationToken)
    {
        var customers = await _customerRepository.GetAllAsync(cancellationToken);

        return new GetCustomersResponse(customers);
    }
}