var ZS = ZS || {};

ZS.Views = ZS.Views || {};

ZS.Views.AuthView = function () {
    var self = this;
    self.elm = null;
    

    this.Initialize = function () {
        //Constructor
        self.elm = $('<div/>');
        self.elm.on("click", "#btnLogin", function() {
            console.log('Attempting authentication!');
            var u = $('#txtUsername', self.elm).val();
            var p = $('#txtPassword', self.elm).val();
            var r = $('#cbRemember', self.elm).is("checked");
            ZS.Communication.UserExpenses.GetUserAuthentication(u, p,r).done(function (response, responseText, jqXHR) {
                //Save this auth information into the local store. 
                console.log("Authentication.");
                console.log(response.success);
                console.log(jqXHR.getAllResponseHeaders());
                //console.log(jqXHR.getResponseHeader('Set-Cookie'));
                if (response.success == "true") {
                    //navigate to main page. 
                    var credmodel = new ZS.Model.Credential();
                    credmodel.ApplyCredentials(u, p, response.authName, response.authToken);
                    credmodel.Save().done(function() {
                        $('#navCurrentExpenses').click();
                    });
                    
                } else {
                    self.elm.append("<p>Wrong user name or password. Try again!</p>");
                }
            }).always(function (response, responseText, jqXHR) {
                console.log(jqXHR.getResponseHeader('Set-Cookie'));
            });
        });
    };


    this.Render = function() {
        var htmlContent = ZS.Views.AuthView.template();
        this.elm.html(htmlContent);
        return this;
    };


    //Call the constructor when page loads
    this.Initialize();
};

ZS.Views.AuthView.template = Handlebars.compile($('#authTemplate').html());