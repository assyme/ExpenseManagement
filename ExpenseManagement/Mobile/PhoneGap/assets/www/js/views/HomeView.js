var ZS = ZS || {};

ZS.Views = ZS.Views || {};

ZS.Views.HomeView = function () {
    var self = this;
    var expCollection;
    this.el = null;
    var initialize = function () {
        //Defining a div wrapper for a view to display elements and bind events on. 
        expCollection = new ZS.model.expenseCollection();
        
        self.el = $('<div/>');
    };

    this.Render = function () {
        //Call the dal (Data Access Layer) to get expenses and render them into the div wrapper
        var def = $.Deferred();
        expCollection.Load().done(function(exp) {
            //When read is done. 
            var renderedText = ZS.Views.HomeView.ExpenseListTemplate(exp);
            self.el.html(renderedText);
            def.resolveWith(self, [renderedText]);
        });
        def.done(bindEvents);
        return def.promise();
    };

    var bindEvents = function() {
        if (self.el == null) {
            return;
        } else {
            $('#btnDelete', self.el).on('click', function () {
                var id = $(this).parent('.well').attr('data');
                expCollection.RemoveExpense(id);
                $(this).parent('.well').remove();
            });
        }
    };
    initialize();
};


ZS.Views.HomeView.ExpenseListTemplate = Handlebars.compile($('#ExpenseListTemplate').html());