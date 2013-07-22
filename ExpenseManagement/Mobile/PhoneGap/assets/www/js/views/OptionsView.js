var ZS = ZS || {};

ZS.Views = ZS.Views || {};

ZS.Views.Options = function() {
    var self = this;
    self.elm = $("<div/>");
    var optionsTemplate = Handlebars.compile($('#optionsTemplate').html());
    //bind events. 
    self.elm.on('click', '#btnSaveOptions', function() {
        ZS.Common.Options.option.StorageLocation = $('#sltLocalStore').val();
        ZS.Common.Options.Save();
    });
    return {
        Render : function() {
            self.elm.html(optionsTemplate(ZS.Common.Options.option));
            return self;
        }
    };
};

