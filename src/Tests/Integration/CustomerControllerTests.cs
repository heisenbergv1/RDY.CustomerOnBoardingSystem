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


    [Fact]
    public async Task CreateCustomer_WithValidSignature_ShouldSucceed()
    {
        var request = new CreateCustomerRequest(
            FirstName: "John",
            LastName: "Doe",
            Email: "john.doe@example.com",
            PhoneNumber: "1234567890",
            SignatureBase64: Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes("valid-signature"))
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
    public async Task CreateCustomer_WithInvalidBase64Signature_ShouldReturnBadRequest()
    {
        var request = new CreateCustomerRequest(
            FirstName: "John",
            LastName: "Doe",
            Email: "john.doe@example.com",
            PhoneNumber: "1234567890",
            SignatureBase64: "INVALID_BASE64"
        );

        var response = await _client.PostAsJsonAsync("/api/Customer", request);
        var content = await response.Content.ReadAsStringAsync();

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        Assert.Contains("Signature", content);
        Assert.Contains("valid Base64", content);
    }

    [Fact]
    public async Task CreateCustomer_WithEmptyDecodedSignature_ShouldReturnBadRequest()
    {
        var emptyBytes = Convert.ToBase64String(Array.Empty<byte>());

        var request = new CreateCustomerRequest(
            FirstName: "John",
            LastName: "Doe",
            Email: "john.doe@example.com",
            PhoneNumber: "1234567890",
            SignatureBase64: emptyBytes
        );

        var response = await _client.PostAsJsonAsync("/api/Customer", request);
        var content = await response.Content.ReadAsStringAsync();

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        Assert.Contains("\"SignatureBase64\"", content);
        Assert.Contains("Signature is required", content);
    }

    [Theory]
    [InlineData("", "Doe", "john.doe@example.com", "1234567890", "FirstName", "First name is required")]
    [InlineData("John", "", "john.doe@example.com", "1234567890", "LastName", "Last name is required")]
    [InlineData("John123", "Doe", "john.doe@example.com", "1234567890", "FirstName", "First name must contain letters only")]
    [InlineData("John", "Doe123", "john.doe@example.com", "1234567890", "LastName", "Last name must contain letters only")]
    [InlineData("John", "Doe", "invalid-email", "1234567890", "Email", "Email must be valid")]
    [InlineData("John", "Doe", "john.doe@example.com", "not-numbers", "PhoneNumber", "Phone number must contain numbers only")]
    public async Task CreateCustomer_ReturnsValidationErrors_ForInvalidFields(
        string firstName,
        string lastName,
        string email,
        string phone,
        string expectedField,
        string expectedErrorMessage)
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
        Assert.Contains(expectedErrorMessage, content);
    }

    #endregion

    #region GetCustomer Tests

    [Fact]
    public async Task GetCustomer_ReturnsCustomer_WhenExists()
    {
        var id = await SeedCustomerAsync();
        var response = await _client.GetAsync($"/api/Customer/{id}");

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        var customer = await response.Content.ReadFromJsonAsync<Customer>();
        Assert.NotNull(customer);
        Assert.Equal(id, customer!.Id);
    }

    [Fact]
    public async Task GetCustomer_ReturnsNotFound_WhenNotExists()
    {
        var response = await _client.GetAsync("/api/Customer/999999");
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }

    #endregion

    #region GetAllCustomers Tests

    [Fact]
    public async Task GetAllCustomers_ReturnsList()
    {
        await SeedCustomerAsync();
        await SeedCustomerAsync();

        var response = await _client.GetAsync("/api/Customer");

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