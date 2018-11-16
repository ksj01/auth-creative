$(document).ready(function() {

    $("#loginBtn").click(function() {
        var use = $('#username').val();
        var pass = $('#password').val();
        console.log("here");

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
                        everything = "<h4>Login Successful!.</h4>";
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
                if (textStatus != "success") {
                    console.log("Already taken.");
                }
                $("#done").html(textStatus);
            },
            error: function(xhr) {
                var everything = "<h4>Error. Username probably already taken.</h4>";
                $("#comments").html(everything);
            }
        })
    });


    $("#deleteComments").click(function() {

        var myobj = { Delete: "delete" };
        jobj = JSON.stringify(myobj);

        var url = "comment";
        $.ajax({
            url: url,
            type: "POST",
            data: jobj,
            contentType: "application/json; charset=utf-8",
            success: function(data, textStatus) {
                $("#done").html(textStatus);
            }
        })
    });


    $("#postComment").click(function() {
        var myobj = { Name: $("#name").val(), Comment: $("#comment").val() };
        jobj = JSON.stringify(myobj);
        $("#json").text(jobj);

        var url = "comment";
        $.ajax({
            url: url,
            type: "POST",
            data: jobj,
            contentType: "application/json; charset=utf-8",
            success: function(data, textStatus) {
                $("#done").html(textStatus);
            }
        })
    });
});
