$(document).ready(function() {
    console.log("application initialized");
    console.log(config.baseUrl);
    var addUri = "";
    if (config.baseUrl == "pu-sdapalek.zs.local") {
        addUri = "/ExpenseManager";
    }
    $.ajax({
        type: "POST",
        url: addUri +  "/UserExpenses/GetAllExpenses",
        dataType: "json",
        success: function(response) {
            console.log("reponse was succesfull");
            console.log(response);
        }
    });
});