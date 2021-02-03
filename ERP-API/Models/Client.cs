﻿using System;
using System.Collections.Generic;

#nullable disable

namespace ERP_API.Models
{
    public partial class Client
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Cif { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string CompletedOrders { get; set; }
    }
}
