﻿$(document).ready(function() {
    console.log("application initialized");
    console.log(config.baseUrl);
    
    $.ajax({
        type: "POST",
        url: "/ExpenseManager/UserExpenses/GetAllExpenses",
        dataType: "json",
        success: function(response) {
            console.log("reponse was succesfull");
            console.log(response);
        }
    });
});