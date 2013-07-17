namespace ExpenseManagement.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddUsernameMig : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Expenses", "Username", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Expenses", "Username");
        }
    }
}
