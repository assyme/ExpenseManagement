var ZS = ZS || {};
ZS.Common = ZS.Common || {};

var MainApp = function () {
    var expenses;
    
    
    // Application Constructor
    this.initialize = function () {
        console.log("binding device ready events");
        document.addEventListener("deviceready", onDeviceReady, true);
    };

    var fetchNewDataFromServer = function() {
        if (deviceInfo.IsConnected) {
            //Update the wifi icon
            $('#wifiStatus').addClass("icon-signal");
            ZS.Communication.UserExpenses.GetUserExpenses().done(function (data,textStatus,jqXHR) {
                console.log("data recieved from server");
                console.log(data);
                var newExpensesCount = ZS.Common.Expenses.ProcessNewServerData(data);
                $('#badgeExpense').html(newExpensesCount);
            }).fail(function (jqXHR,responseText,errorThrown) {
                console.log("request failed" + responseText);
            });
        } else {
            $('#wifiStatus').removeClass("icon-signal");
        }
    };

    var onDeviceReady = function () {

        //dac.Read(expenses);
        //window.navigator.notification.alert("Device Ready");
        console.log("application is ready");
        //Load Commons
        ZS.Common.Options = new ZS.Model.Options();
        ZS.Common.Expenses = new ZS.Model.ExpenseCollection();

        //Fill device details. 
        deviceInfo = new ZS.Model.DeviceInfo();
       
       
        var homeView = new ZS.Views.HomeView();
        
        homeView.Render().done(function() {
            $('div#contents').html(this.el);
        });

        fetchNewDataFromServer();
        $('ul.nav li').on('click', function () {
            $('li.active').removeClass('active');
            $(this).addClass('active');
            //fetchNewDataFromServer();
        });

        $('#navNewExpense').on('click', function () {
            var view = new ZS.Views.NewExpenseView();
            view.Render().done(function() {
                $('div#contents').html(this.el);
            });
            fetchNewDataFromServer();
        });

        $('li#navCurrentExpenses').on('click', function () {
            var view = new ZS.Views.HomeView();
            view.Render().done(function () {
                $('div#contents').html(this.el);
            });
            fetchNewDataFromServer();
        });


        $('li#navAuth').on('click', function() {
            var aView = new ZS.Views.AuthView();
            $('div#contents').html(aView.Render().elm);
        });

        $('#navSync').on('click', function () {
            console.log("syncing device");
            ZS.Common.Expenses.ResyncPendingData();
            ZS.Common.Expenses.Save().done(function() {
                $('#navCurrentExpenses').click();
            });
        });

        $('li#navOptions').on('click', function () {
            var view = new ZS.Views.Options();
            $('div#contents').html(view.Render().elm);
        });
    };
};

window.Handlebars.registerHelper('select', function (value, options) {
    var $el = $('<select />').html(options.fn(this));
    $el.find('[value=' + value + ']').attr({ 'selected': 'selected' });
    return $el.html();
});
