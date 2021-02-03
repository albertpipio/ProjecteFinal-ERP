using System;
using System.Collections.Generic;

#nullable disable

namespace ERP_API.Models
{
    public partial class Employee
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string PastOrders { get; set; }
        public string CompletedOrders { get; set; }
        public decimal? Salary { get; set; }
    }
}
