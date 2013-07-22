var ZS = ZS || {};

ZS.Model = ZS.Model || {};

ZS.Model.Credential = function() {
    var self = this;
    self.store = new ZS.Storage.LocalStorage("credentials");
    var creds = function(usr, pwd, cookieName, cookieToken) {
        this.UserName = usr;
        this.Password = pwd;
        this.CookieName = cookieName;
        this.CookieToken = cookieToken;
    };

    self.creds = new creds("", "", "", "");

    return {
        Load: function() {
            //Load from data store
            var dfd = $.Deferred();
            self.store.Read().done(function(data) {
                self.creds = new creds(data.UserName, data.Password, data.CookieName, data.CookieToken);
                $.resolveWith(self, [self.creds]);
            });

            return dfd.promise();
        },
        Save : function() {
            //Save to a data store
            var dfd = $.Deferred();
            self.store.Save(self.creds).done(function() {
                dfd.resolveWith(this, [self.creds]);
            });
            return dfd.promise();
        },
        ApplyCredentials : function(u, p, n, t) {
            self.creds = new creds(u, p, n, t);
        }
    };
};