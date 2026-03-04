using System.ComponentModel.DataAnnotations;

namespace Api.Dtos;

public sealed record CreateCustomerRequest(
    [param: Required(ErrorMessage = "FirstName is required")]
    [param: RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "FirstName must contain letters only")]
    string FirstName,

    [param: Required(ErrorMessage = "LastName is required")]
    [param: RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "LastName must contain letters only")]
    string LastName,

    [param: Required(ErrorMessage = "Email is required")]
    [param: EmailAddress(ErrorMessage = "Email must be valid")]
    string Email,

    [param: Required(ErrorMessage = "PhoneNumber is required")]
    [param: RegularExpression(@"^\d+$", ErrorMessage = "PhoneNumber must contain numbers only")]
    string PhoneNumber
);