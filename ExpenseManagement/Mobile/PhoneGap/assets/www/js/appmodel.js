var expense = function (id, name, amount, category) {
    this.Name = name;
    this.Amount = amount;
    this.Id = id;
    this.Category = category;
    
};
var expenseCollection = function () {
    this.expenses = [];
    this.SaveKey = "expenses";
    var addedExpenseIds = [];
    var pendingExpenseData = [];
    this.addExpense = function (name, amount, category, id) {
        var exp = new expense(id, name, amount, category);
        if (typeof id != "undefined" && id > 0) {
            addedExpenseIds.push(exp.Id);
        }
        this.expenses.push(exp);
        return exp;
    };
    this.DataToSave = function () {

        var str = JSON.stringify(this.expenses);
        console.log("Data to save : " + str);
        return str;
    };
    this.Clear = function () {
        this.expenses = [];
        addedExpenseIds = [];
    };
    this.RefreshNewData = function (jsonData) {
        var deferred = $.Deferred();
        this.Clear();
        var len = jsonData.length;
        for (var i = 0 ; i < len; i++) {
            var exp = jsonData[i];
            this.addExpense(exp.Name, exp.Amount, exp.Category, exp.Id);
            
        }
        deferred.resolve(this.expenses);
        return deferred.promise();
    };
    this.ProcessNewServerData = function(response) {
        var newData = 0;
        if (response instanceof Array) {
            for (var i = 0; i < response.length; i++) {
                var exp = response[i];
                if (addedExpenseIds.indexOf(exp.Id) == -1) {
                    newData++;
                    pendingExpenseData.push(new expense(exp.Id, exp.Name, exp.Amount, exp.Category));
                }
            }
        } else {
            throw "need array input to this function";
        }
        return newData;
    };

    this.ResyncPendingData = function() {
        for (var i = 0; i < pendingExpenseData.length; i++) {
            this.expenses.push(pendingExpenseData[i]);
        }
    };

};
