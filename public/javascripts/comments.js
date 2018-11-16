$(document).ready(function() {

    $("#loginBtn").click(function() {
        var use = $('#username').val();
        var pass = $('#password').val();

        var url = "login?use=" + use + "&pass=" + pass;
        $.ajax({
            url: url,
            type: "GET",
            data: use,
            contentType: "application/json; charset=utf-8",
            success: function(data, textStatus) {
                console.log(data);
                console.log(textStatus);
                var everything;
                for (var comment in data) {
                    com = data[comment];
                    if (pass != com.Password) {
                        everything = "<h4>Error. Incorrect Password.</h4>";
                    }
                    else {
                        getTasks();
                    }
                }
                $("#comments").html(everything);
            }
        })
    });

    $("#registerBtn").click(function() {
        console.log("Register Clicked");
        var use = $('#username').val();
        var pass = $('#password').val();
        console.log("here");

        var myobj = { Name: $("#username").val(), Password: $("#password").val() };
        jobj = JSON.stringify(myobj);

        var url = "login";
        $.ajax({
            url: url,
            type: "POST",
            data: jobj,
            contentType: "application/json; charset=utf-8",
            success: function(data, textStatus) {
                console.log(textStatus);
                getTasks();
            },
            error: function(xhr) {
                var everything = "<h4>Error. Username probably already taken.</h4>";
                $("#comments").html(everything);
            }
        })
    });


    function getTasks() {
        
        var myobj = { Name: $("#username").val() };
        var url = "comment";
        $.ajax({
            url: url,
            type: "GET",
            data: myobj,
            contentType: "application/json; charset=utf-8",
            success: function(data, textStatus) {
                console.log(data);
                // console.log(data);
                // console.log(textStatus);
                var everything = "<ul class=\"list-group mb-5\">";
                var strike = "";
                for (var comment in data) {
                    com = data[comment];
                    if (com.Done) {
                        strike = "strike disabled";
                    }
                        everything += "<li class=\"list-group-item font-weight-bold " + strike + "\" onclick=\"ChangeTextDecoration(this);\">" + com.Comment + "</li>";
                }
                everything += "</ul>";
                $("#comments").html(everything);
                $('#taskadder').removeClass('d-none');
            }
        })
    };


    $("#addTask").click(function() {
        var myobj = { Name: $("#username").val(), Comment: $("#newTask").val(), Done: "false" };
        jobj = JSON.stringify(myobj);

        var url = "comment";
        $.ajax({
            url: url,
            type: "POST",
            data: jobj,
            contentType: "application/json; charset=utf-8",
            success: function(data, textStatus) {
            }
        })
        getTasks();
    });
});
