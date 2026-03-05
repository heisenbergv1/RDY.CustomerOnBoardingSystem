// Tests/Integration/CustomerControllerTests.cs
using Api.Dtos;
using Application.Commands;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Net;
using System.Net.Http.Json;

namespace Tests.Integration;

public class CustomerControllerTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;
    private readonly HttpClient _client;

    public CustomerControllerTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory.WithWebHostBuilder(builder =>
        {
            // Optional: override configuration for test DB if needed
        });
        _client = _factory.CreateClient();
    }

    #region CreateCustomer Tests

    [Fact]
    public async Task CreateCustomer_ReturnsCreated_WithValidRequest()
    {
        var request = new CreateCustomerRequest(
            FirstName: "John",
            LastName: "Doe",
            Email: "john.doe@example.com",
            PhoneNumber: "1234567890",
            SignatureBase64: Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes("test-signature"))
        );

        var response = await _client.PostAsJsonAsync("/api/Customer", request);
        var content = await response.Content.ReadAsStringAsync();
        var result = JsonConvert.DeserializeObject<CreateCustomerResponse>(content);

        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        Assert.NotNull(result);
        Assert.True(result!.Success);
        Assert.True(result.CustomerId > 0);
    }

    [Fact]
    public async Task CreateCustomer_ReturnsBadRequest_WhenRequestIsNull()
    {
        var response = await _client.PostAsJsonAsync("/api/Customer", new { });
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Theory]
    [InlineData("", "Doe", "john.doe@example.com", "1234567890", "FirstName")]
    [InlineData("John", "", "john.doe@example.com", "1234567890", "LastName")]
    [InlineData("John", "Doe", "invalid-email", "1234567890", "Email")]
    [InlineData("John", "Doe", "john.doe@example.com", "not-numbers", "PhoneNumber")]
    public async Task CreateCustomer_ReturnsValidationErrors_ForInvalidFields(
        string firstName, string lastName, string email, string phone, string expectedField)
    {
        var request = new CreateCustomerRequest(
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            PhoneNumber: phone,
            SignatureBase64: Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes("sig"))
        );

        var response = await _client.PostAsJsonAsync("/api/Customer", request);
        var content = await response.Content.ReadAsStringAsync();

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        Assert.Contains(expectedField, content);
    }

    #endregion

    #region GetCustomer Tests

    [Fact]
    public async Task GetCustomer_ReturnsCustomer_WhenExists()
    {
        // Arrange
        var id = await SeedCustomerAsync();

        // Act
        var response = await _client.GetAsync($"/api/Customer/{id}");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var customer = await response.Content.ReadFromJsonAsync<Customer>();
        Assert.NotNull(customer);
        Assert.Equal(id, customer!.Id);
    }

    [Fact]
    public async Task GetCustomer_ReturnsNotFound_WhenNotExists()
    {
        // Act
        var response = await _client.GetAsync("/api/Customer/999999");

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    #endregion

    #region GetAllCustomers Tests

    [Fact]
    public async Task GetAllCustomers_ReturnsList()
    {
        // Arrange
        await SeedCustomerAsync();
        await SeedCustomerAsync();

        // Act
        var response = await _client.GetAsync("/api/Customer");

        // Assert
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var customers = await response.Content.ReadFromJsonAsync<List<Customer>>();

        Assert.NotNull(customers);
        Assert.True(customers!.Count >= 2);
    }

    #endregion

    private async Task<int> SeedCustomerAsync()
    {
        var request = new CreateCustomerRequest(
            FirstName: "John",
            LastName: "Doe",
            Email: "john@test.com",
            PhoneNumber: "123456789",
            SignatureBase64: Convert.ToBase64String(
                System.Text.Encoding.UTF8.GetBytes("sig"))
        );

        var response = await _client.PostAsJsonAsync("/api/Customer", request);
        response.EnsureSuccessStatusCode();

        var content = await response.Content.ReadAsStringAsync();
        var result = JsonConvert.DeserializeObject<CreateCustomerResponse>(content);

        return result!.CustomerId;
    }
}