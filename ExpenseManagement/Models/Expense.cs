using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ExpenseManagement.Models
{
    public class Expense
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public double Amount { get; set; }
    }

    public class ExpenseDBContext : DbContext
    {
        public DbSet<Expense> Expenses { get; set; } 
    }
}