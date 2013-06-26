$(document).ready(function() {
    console.log("application initialized");
    $.ajax({
        type: "POST",
        url: "http://pu-sdapalek.zs.local/ExpenseManager/UserExpenses/GetAllExpenses",
        dataType: "json",
        success: function(response) {
            console.log("reponse was succesfull");
            console.log(response);
        }
    });
});