using System;
using System.Collections.Generic;

#nullable disable

namespace ERP_API.Models
{
    public partial class Order
    {
        public Guid Id { get; set; }
        public string Status { get; set; }
        public string Priority { get; set; }
        public string Client { get; set; }
        public string Employee { get; set; }
        public string DateOfCreation { get; set; }
        public string DateOfAssignment { get; set; }
        public string DateOfCompletion { get; set; }
        public string Address { get; set; }
        public decimal? Price { get; set; }
    }
}
