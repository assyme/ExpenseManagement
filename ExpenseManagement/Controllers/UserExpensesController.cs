using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ExpenseManagement.Models;

namespace ExpenseManagement.Controllers
{
    public class UserExpensesController : Controller
    {
        private ExpenseDBContext db = new ExpenseDBContext();

        //
        // GET: /UserExpenses/

        public ActionResult Index()
        {
            return View(db.Expenses.OrderByDescending(x => x.Id).ToList());
        }

        //
        // GET: /UserExpenses/Details/5

        public ActionResult Details(int id = 0)
        {
            Expense expense = db.Expenses.Find(id);
            if (expense == null)
            {
                return HttpNotFound();
            }
            return View(expense);
        }

        //
        // GET: /UserExpenses/Create

        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /UserExpenses/Create

        [HttpPost]
        public ActionResult Create(Expense expense)
        {
            if (ModelState.IsValid)
            {
                db.Expenses.Add(expense);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(expense);
        }

        //
        // GET: /UserExpenses/Edit/5

        public ActionResult Edit(int id = 0)
        {
            Expense expense = db.Expenses.Find(id);
            if (expense == null)
            {
                return HttpNotFound();
            }
            return View(expense);
        }

        //
        // POST: /UserExpenses/Edit/5

        [HttpPost]
        public ActionResult Edit(Expense expense)
        {
            if (ModelState.IsValid)
            {
                db.Entry(expense).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(expense);
        }

        //
        // GET: /UserExpenses/Delete/5

        public ActionResult Delete(int id = 0)
        {
            Expense expense = db.Expenses.Find(id);
            if (expense == null)
            {
                return HttpNotFound();
            }
            return View(expense);
        }

        //
        // POST: /UserExpenses/Delete/5

        [HttpPost, ActionName("Delete")]
        public ActionResult DeleteConfirmed(int id)
        {
            Expense expense = db.Expenses.Find(id);
            db.Expenses.Remove(expense);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        [HttpPost]
        public JsonResult GetAllExpenses()
        {
            return Json(db.Expenses.OrderByDescending(x => x.Id).ToList());
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}