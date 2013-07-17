var AuthView = function() {
    this.elm = null;

    this.Initialize = function () {
        //Constructor
        this.elm = $('<div/>');
    };


    this.Render = function() {
        var htmlContent = AuthView.template();
        this.elm.html(htmlContent);
        bindEvents(this.elm);
        return this;
    };

    var bindEvents = function(elm) {
        if (elm == null) {
            return;
        } else {
            $('#btnLogin', elm).on('click', function() {
                console.log('Attempting authentication!');
                var u = $('#txtUsername', elm).val();
                var p = $('#txtPassword', elm).val();
                ZS.Communication.UserExpenses.GetUserAuthentication(u,p).done(function(response) {
                    //Save this auth information into the local store. 
                    console.log(response);
                });
            });
        }
    };

    //Call the constructor when page loads
    this.Initialize();
};

AuthView.template = Handlebars.compile($('#authTemplate').html());