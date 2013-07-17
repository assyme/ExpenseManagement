var PoC = PoC || {};

var MainApp = function () {
    var expenses = new ZS.model.expenseCollection();
    var dac = new LocalStore();

    /* Compiling templates : Is there a better way? */
    var footerTemplateSource = $('#footerTemplate').html();
    var footerTemplate = Handlebars.compile(footerTemplateSource);

    var source = $('#template').html();
    var expenseTemplate = Handlebars.compile(source);

    var newExpenseSource = $('#newExpenseTemplate').html();
    var newExpenseTemplate = Handlebars.compile(newExpenseSource);

    // Application Constructor
    this.initialize = function () {
        console.log("binding device ready events");
        document.addEventListener("deviceready", onDeviceReady, true);
    };

    var fetchNewDataFromServer = function() {
        if (deviceInfo.IsConnected) {
            //Update the wifi icon
            $('#wifiStatus').addClass("icon-signal");
            ZS.Communication.UserExpenses.GetUserExpenses().done(function (response) {
                console.log("data recieved from server");
                console.log(response);
                var newExpensesCount = expenses.ProcessNewServerData(response);
                $('#badgeExpense').html(newExpensesCount);
            }).done(function (obj,resp,err) {
                console.log("request failed" + resp);
            });
        } else {
            $('#wifiStatus').removeClass("icon-signal");
        }
    };

    var onDeviceReady = function () {

        //dac.Read(expenses);
        //window.navigator.notification.alert("Device Ready");
        console.log("application is ready");
        


        //Fill device details. 
        deviceInfo = new DeviceInfo();
       
       
        var homeView = new ZS.Views.HomeView();
        
        homeView.Render().done(function() {
            $('div#contents').html(this.el);
        });

        ZS.Communication.UserExpenses.GetUserAuthentication("nothing", "nothing").done(function(resposne) {
            console.log(resposne);
        });



        fetchNewDataFromServer();
        $('ul.nav li').on('click', function () {
            $('li.active').removeClass('active');
            $(this).addClass('active');
            fetchNewDataFromServer();
        });

        $('#navNewExpense').on('click', function () {
            var view = new ZS.Views.NewExpenseView();
            view.Render().done(function() {
                $('div#contents').html(this.el);
            });
        });

        $('li#navCurrentExpenses').on('click', function () {
            homeView.Render().done(function() {
                $('div#contents').html(this.el);
            });
        });


        $('li#navAuth').on('click', function() {
            var aView = new AuthView();
            $('div#contents').html(aView.Render().elm);
        });

        $('#navSync').on('click', function () {
            console.log("syncing device");
            expenses.ResyncPendingData();
            dac = new LocalStore();
            dac.Save(expenses).done(function() {
                $('li#navCurrentExpenses').click();
            });
        });
    };
};
