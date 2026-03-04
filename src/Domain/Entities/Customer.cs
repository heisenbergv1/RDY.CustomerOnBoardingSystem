using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities;

public class Customer
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string FirstName { get; set; } = default!;

    [Required]
    [MaxLength(100)]
    public string LastName { get; set; } = default!;

    [Required]
    [MaxLength(255)]
    public string Email { get; set; } = default!;

    [Required]
    [MaxLength(50)]
    public string PhoneNumber { get; set; } = default!;

    [Required]
    public string SignatureBase64 { get; set; } = default!;

    public DateTime DateCreated { get; set; } = DateTime.UtcNow;
}