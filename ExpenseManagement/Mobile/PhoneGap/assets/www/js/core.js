//Core data models for this app will lie here. 

var fileDAC = function () {
    //TODO : Make it return a deferred object. 
    var obToSave = null;

    var gotFS = function (fileSystem) {
        var filename = obToSave.SaveKey + ".txt";
        fileSystem.root.getFile(filename, { create: true, exclusive: false }, gotFileEntry, failedFS);
    };
    var failedFS = function (evt) {
        console.log("failed to get the file system");
        console.log(evt.target.error.code);
    };
    var gotFileEntry = function (fileEntry) {
        console.log("Got file entry. will create a writer now out of it.");
        fileEntry.createWriter(gotFileWriter, failedFS);
    };

    var gotFileWriter = function (writer) {
        console.log("got the writer. now will start writing to the file");
        writer.write(obToSave.DataToSave());
    };
    this.Save = function (objectToSave) {
        console.log("saving to file");
        obToSave = objectToSave;
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, failedFS);

        console.log("save successfull");
    };
    this.Read = function (objectToSave) {
        var returnObject = null;
        console.log("reading from file");
        obToSave = objectToSave;
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
            var fileName = obToSave.SaveKey + ".txt";
            fileSystem.root.getFile(fileName, null, function (fileEntry) {
                fileEntry.file(function (file) {
                    var reader = new FileReader();
                    reader.onload = function (evt) {
                        console.log(evt.target.result);
                        returnObject = JSON.parse(evt.target.result);
                        $.event.trigger('readComplete', { value: returnObject });
                    };
                    reader.readAsText(file);
                }, failedFS);
            }, failedFS);
        }, failedFS);
    };
};

//Supported on Android, IOS and Blackberry only. (Cannot be used in windows)
var SqlStore = function () {
    
    //Private members
    var db;
   
    //Constructor
    var initialize = function() {
        db = window.openDatabase("ExpenseManagement", "1.0", "Expense Management", 1024 * 1024);
        db.transaction(createDb, error, success);
    };

    var createDb = function(tx) {
        tx.executeSql('DROP TABLE IF EXISTS EXPENSE');
        tx.executeSql('CREATE TABLE IF NOT EXISTS EXPENSE (id,name)');
        
    };

    var error = function(tx, err) {
        console.log("Error in DB transaction: " + err);
    };

    var success = function(tx, err) {
        console.log("db transaction successful.");
    };


    //Public members.
    this.Save = function (objectToSave) {
        db.transaction(function(tx) {
            var expenses = JSON.parse(objectToSave.DataToSave());
            for (var i = 0; i < expenses.length; i++) {
                var e = expenses[i];
                var vals = "(" + e.Id + "," + e.Name + "," + e.Category + "," + e.Amount + ")";
                var sqlQuery = "INSERT INTO EXPENSE(id,name,category,amount,device) VALUES " + vals;
                tx.executeSql(sqlQuery);
            }
        }, error, success);
    };

    this.Read = function(objectToRead) {

    };
    
    //Call the constructor
    initialize();
};

var LocalStore = function () {
    this.Save = function (objectToSave) {
        var deferred = $.Deferred();
        console.log("Saving in database");
        var result = window.localStorage.setItem(objectToSave.SaveKey, objectToSave.DataToSave());
        deferred.resolveWith(objectToSave, [objectToSave]);
        return deferred.promise();
    };
    this.Read = function (objectToRead) {
        console.log("Reading from database");
        var deferred = $.Deferred();
        var returnObject = window.localStorage.getItem(objectToRead.SaveKey);
        deferred.resolveWith(objectToRead, [JSON.parse(returnObject)]);
        return deferred.promise();
        //$.event.trigger('readComplete',{value:returnObject})
    };
};

var ServerDAC = function () {

    //var rooturl = "http://splitexpense.apphb.com/";
    var rooturl = "http://pu-sdapalek.zs.local/ExpenseManager/";

    this.Read = function (data) {
        //read data from server
        console.log("requesting data from server");
        //already returns a deferred object hence safe. 
        var args = data.args || {};
        return $.ajax({
            type: "POST",
            url: rooturl +  data.url,
            dataType: "json",
            context: data.objectToRead,
            data : args
        });
    };

    this.Save = function (data) {
        //to save data back to the server. 
        throw "Not implemented yet";
    };
};
var DeviceInfo = function () {

    this.Connection = function () {
        //this function returns the connection type if cordova is loaded. 
        var states = {};
        states[Connection.UNKNOWN] = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI] = 'WiFi connection';
        states[Connection.CELL_2G] = 'Cell 2G connection';
        states[Connection.CELL_3G] = 'Cell 3G connection';
        states[Connection.CELL_4G] = 'Cell 4G connection';
        states[Connection.CELL] = 'Cell generic connection';
        states[Connection.NONE] = 'No network connection';

        var networkState = navigator.connection.type;
        return states[networkState];
    };
    this.IsConnected = function () {
        if (this.Connection() == "No network connection") {
            return false;
        } else {
            return true;
        }
    };
};