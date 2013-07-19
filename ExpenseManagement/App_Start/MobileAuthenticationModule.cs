using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Web.Infrastructure.DynamicModuleHelper;

namespace ExpenseManagement.App_Start
{
    public class MobileAuthenticationModule : IHttpModule
    {
        public void Init(HttpApplication context)
        {
            context.PostReleaseRequestState += ContextOnPostReleaseRequestState;
            context.EndRequest += ContextOnEndRequest;
        }

        private void ContextOnEndRequest(object sender, EventArgs eventArgs)
        {
            var context = (HttpApplication) sender;
            if (context.Context.Items.Contains("MobileAuthKey"))
            {
                var response = context.Response;
                response.TrySkipIisCustomErrors = true;
                response.ClearContent();
                response.StatusCode = 401;
                response.RedirectLocation = null;
            }
        }

        private void ContextOnPostReleaseRequestState(object sender, EventArgs eventArgs)
        {
            var context = (HttpApplication) sender;
            
            if (context.Response.StatusCode == 401 && context.Request.Headers["Requested-With"] == "XMLHttpRequest")
            {
                context.Context.Items["MobileAuthKey"] = true;
            }
        }

        public void Dispose()
        {
            
        }
    }
}