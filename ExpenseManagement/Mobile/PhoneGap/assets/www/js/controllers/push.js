/* This code is ios push notification specific */

var ZS = ZS || {};
ZS.PushNotification = (function () {
    var self = this;
    self.notification;
    var tokenHandler = function (token) {
        console.log("yeah you got it");
        console.log(token);
        alert(token);
    };
    var errorHandler = function (error) {
        alert(error);
    };

    return {
        init: function () {
            //contructor
            console.log("initilizing ios push notifications");
            self.notification = window.plugins.pushNotification;
            self.notification.register(tokenHandler, errorHandler,
            { "badge": true, "sound": true, "alert": true, "ecb": "ZS.PushNotification.onNotificationAPN" });
        },
        onNotificationAPN: function (event) {
            //event that gets fired when the app receives notification.
            //TODO :
        }
    }
}());