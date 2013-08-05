using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ExpenseManagement.Models;
using MoonAPNS;

namespace ExpenseManagement.Controllers
{
    
    public class UserExpensesController : Controller
    {
        private ExpenseDBContext db = new ExpenseDBContext();

        //For now just storing it here. Ideally we should have a table for this. 
        private static Dictionary<String, String> userDeviceToken = new Dictionary<string, String>();
        private readonly string _p12Filelocation ;


        public UserExpensesController()
        {
            _p12Filelocation = HttpContext.Server.MapPath("~/Certificate/apn_developer_identity.p12");
        }

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
        [Authorize]
        public ActionResult Create()
        {
            return View();
        }

        //
        // POST: /UserExpenses/Create
        [Authorize]
        [HttpPost]
        public ActionResult Create(Expense expense)
        {
            if (ModelState.IsValid)
            {
                expense.Username = User.Identity.Name;
                db.Expenses.Add(expense);
                db.SaveChanges();

                //Notifiy the user now. 
                if (userDeviceToken.ContainsKey(User.Identity.Name) &&
                    !string.IsNullOrEmpty(userDeviceToken[User.Identity.Name]))
                {
                    //User has not used the mobile version so far. 
                    var payload = new NotificationPayload(userDeviceToken[expense.Username],
                                                      "New expense added - " + expense.Name, 1, "default");

                    var push = new PushNotification(true, _p12Filelocation, "1234");

                    push.SendToApple(new List<NotificationPayload>() { payload });
                }
                
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


        [Authorize]
        [HttpPost]
        public JsonResult GetUserExpenses()
        {
            return Json(db.Expenses.Where(x => x.Username == User.Identity.Name).OrderByDescending(x => x.Id).ToList());
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }

        public ActionResult Notify()
        {
            var deviceToken = "3f26888d6ceedf027cc2d2387d1809f1b0b46a74cf321eb1c1f89f25f4119ffa";
            var payload = new NotificationPayload(deviceToken, "You got report", 1, "default");
            var payload2 = new NotificationPayload(deviceToken, "You got mail", 2, "default");
            var payload3 = new NotificationPayload(deviceToken, "You got fired", 4, "default");
            var notificationList = new List<NotificationPayload> {payload,payload2,payload3};
            
            var push = new PushNotification(true,_p12Filelocation,"1234");
            var rejected = push.SendToApple(notificationList);
            return RedirectToAction("Index");
        }

        [Authorize]
        [HttpPost]
        public JsonResult RegisterDeviceToken(string deviceToken)
        {
            if (userDeviceToken.ContainsKey(User.Identity.Name))
            {
                // update the key. 
                userDeviceToken[User.Identity.Name] = deviceToken;
            }
            else
            {
                userDeviceToken.Add(User.Identity.Name, deviceToken);
            }
            return Json(new {success = true});
        }
    }
}