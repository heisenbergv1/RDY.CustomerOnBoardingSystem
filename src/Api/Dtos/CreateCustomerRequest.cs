using System.ComponentModel.DataAnnotations;

namespace Api.Dtos;

public sealed record CreateCustomerRequest(
    [Required(ErrorMessage = "First name is required")]
    [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "First name must contain letters only")]
    string FirstName,

    [Required(ErrorMessage = "Last name is required")]
    [RegularExpression(@"^[a-zA-Z]+$", ErrorMessage = "Last name must contain letters only")]
    string LastName,

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Email must be valid")]
    string Email,

    [Required(ErrorMessage = "Phone number is required")]
    [RegularExpression(@"^\d+$", ErrorMessage = "Phone number must contain numbers only")]
    string PhoneNumber,

    [Required(ErrorMessage = "Signature is required")]
    [MaxLength(50000, ErrorMessage = "Signature is too long")]
    string SignatureBase64
);