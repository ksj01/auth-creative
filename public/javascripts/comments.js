$(document).ready(function() {
    $("#getComments").click(function() {
        $.getJSON('comment', function(data) {
            console.log(data);
            var everything = "<ul>";
            for (var comment in data) {
                com = data[comment];
                everything += "<li> Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";
            }
            everything += "</ul>";
            $("#comments").html(everything);
        })
    });

    $("#getUserComments").click(function() {
        var myobj = $('#user').val();

        var url = "comment?q=" + myobj;
        $.ajax({
            url: url,
            type: "GET",
            data: myobj,
            contentType: "application/json; charset=utf-8",
            success: function(data, textStatus) {
                console.log(data);
                console.log(textStatus);
                var everything = "<ul>";
                for (var comment in data) {
                    com = data[comment];
                    everything += "<li> Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";
                }
                everything += "</ul>";
                $("#comments").html(everything);
                $("#done").html(textStatus);
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
