var ZS = ZS || {};

ZS.Communication = ZS.Communication || {};

ZS.Communication.UserExpenses = function() {
    var self = this;
    //var rooturl = "http://splitexpense.apphb.com/";
    var rooturl = "http://pu-sdapalek.zs.local/ExpenseManager/";
    return {
      GetAllExpenses : function() {
          return $.ajax({
              url: rooturl + "UserExpenses/GetAllExpenses",
              dataType: "JSON",
              type:"POST"
          });
      },
      GetUserExpenses : function() {
          return $.ajax({
              url: rooturl + "UserExpenses/GetUserExpenses",
              dataType: "JSON",
              type: "POST"
          });
      },
      GetUserAuthentication : function(user,pwd) {
          return $.ajax({
              url: rooturl + "Account/MobileLogin",
              type: "POST",
              dataType: "JSON",
              data: {
                  UserName: user,
                  Password: pwd,
                  RememberMe: false
              },
          });
      }
    };
}();