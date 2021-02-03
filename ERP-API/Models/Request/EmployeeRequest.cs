using System;

namespace ERP_API.Models.Request
{
    public class EmployeeRequest
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