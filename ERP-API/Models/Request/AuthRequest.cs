using System.ComponentModel.DataAnnotations;

namespace ERP_API.Models.Request
{
    public class AuthRequest
    {
        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}