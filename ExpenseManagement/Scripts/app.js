$(document).ready(function () {
    console.log("application initialized");
    console.log(config.baseUrl);
    var addUri = "";
    if (config.baseUrl == "pu-sdapalek.zs.local") {
        addUri = "/ExpenseManager";
    }
    $.ajax({
        type: "POST",
        url: addUri + "/UserExpenses/GetAllExpenses",
        dataType: "json",
        data: {
            
        },
        success: function (response) {
            console.log("reponse was succesfull");
            console.log(response);
        }
    });
    
//    $.ajax({
//        type: "POST",
//        url: addUri + "/Account/MobileLogin",
//        dataType: "json",
//        data: {
//            UserName: "apalekar",
//            Password: "monkey",
//            RememberMe:false
//        },
//        success: function (response) {
//            console.log("reponse was succesfull");
//            console.log(response);
//        }
//    });
});