using System;
using System.Collections.Generic;

#nullable disable

namespace ERP_API.Models
{
    public partial class User
    {
        public long Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Username { get; set; }
    }
}
