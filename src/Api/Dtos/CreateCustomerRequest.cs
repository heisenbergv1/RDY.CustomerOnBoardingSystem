using System.ComponentModel.DataAnnotations;

namespace Api.Dtos;

public sealed record CreateCustomerRequest(
    [Required(ErrorMessage = "FirstName is required")]
    [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "FirstName must contain letters only")]
    string FirstName,

    [Required(ErrorMessage = "LastName is required")]
    [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "LastName must contain letters only")]
    string LastName,

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Email must be valid")]
    string Email,

    [Required(ErrorMessage = "PhoneNumber is required")]
    [RegularExpression(@"^\d+$", ErrorMessage = "PhoneNumber must contain numbers only")]
    string PhoneNumber,

    [Required(ErrorMessage = "Signature is required")]
    [MaxLength(50000, ErrorMessage = "Signature is too long")]
    string SignatureBase64
);