
$(document).ready(function () {

    window.data;

    (function ($) {

        $('#filter').keyup(function () {

            var rex = new RegExp($(this).val(), 'i');
            $('.searchable tr').hide();
            $('.searchable tr').filter(function () {
                return rex.test($(this).text());
            }).show();

        })

    }(jQuery));

    (function ($) {

        $.ajax({
        	type : "GET",
        	url : "http://localhost:9999/contact/select",
        	success : function(resp){
        		prepareData(resp);
        		
        	},
        	error : function(err){
        		console.log("ERROR while fetching contacts ::",err);
        	}
        });

    }(jQuery));

    var contactDetails = function(contact){
    	$("#d_name").html('<b>'+contact.first_name+' '+contact.last_name);
    	detail_row = '<tr><td> <b>'+contact.first_name+' '+contact.last_name +'</b></td></tr>';
		var details_li = '';

		details_li += '<li class="list-group-item"> <h4 class="list-group-item-heading">mobile</h4>'+contact.home_phone+' <i class="phole-icon glyphicon glyphicon-earphone"></i>   <i class="glyphicon icon-chat"></i> </li>';
		details_li += '<li class="list-group-item"> <h4 class="list-group-item-heading">home</h4>'+contact.land_phone+' <i class="phole-icon glyphicon glyphicon-earphone"></i></li>';
		details_li += '<li class="list-group-item"> <h4 class="list-group-item-heading">email</h4>'+contact.email+'</li>';
		details_li += '<li class="list-group-item"> <h4 class="list-group-item-heading">address</h4>'+contact.address+'</li>';    	

    	$("#details").empty().append(details_li);
        window.data = contact;

    }

	$("#new_contact").click(function(){
        $("#first_name").val('');
        $("#last_name").val('');
        $("#user_email").val('');
        $("#land_phone").val('');
        $("#home_phone").val('');
        $("#address").val('');
        //$( "#test" ).load( "add_contact.html" );
        $("#create_modal").modal('show');

		/*$("#db_save").click(function(){
			var data ={};
			data.first_name = $("#first_name").val();
			data.last_name = $("#last_name").val();
			data.email = $("#user_email").val();
			data.land_phone = $("#land_phone").val();
			data.home_phone = $("#home_phone").val();
            data.address = $("#address").val();
            window.data = data;

            saveContact(data);

		});*/

	});

	var saveContact = function(data){
        var url ='',method;
        if(!data.contact_id){
            url = "http://localhost:9999/contact/create";
            method = "POST";
        }else{
            url = "http://localhost:9999/contact/update";
            method = "PUT";
        }
        console.log('method ',method)
		$.ajax({
        	type : method,
        	contentType: "application/json",
        	url : url,
        	data : JSON.stringify(data),
        	success : function(resp){
                console.log(resp);
                if(resp.status === 'success'){
                  $("#create_modal").modal('hide');
                  //prepareData(resp);
                    //location.reload();
                    showMessages(resp);
                    //hideErrors();
                }else{
                    hideErrors();
                    showErrors(resp.errors);
                    $("#error_messages").text(resp.message);
                }
        	},
        	error : function(err){
        		console.log(err);
        	}

		});
	};


	var prepareData = function(resp){
        console.log(resp)
		var contact_row = '';
		$.each(resp.data, function( index, contact ) {
		  	contact_row += '<tr contact_id="'+contact._id+'" first_name="'+contact.first_name+'" last_name="'+contact.last_name+'" address="'+contact.address+'" land_phone="'+contact.land_phone+'" home_phone="'+contact.home_phone+'" email="'+contact.email+'"><td> <a class="contacts_list" href="javascript:void(0)">'+contact.first_name+' <b>'+contact.last_name +'</b></td></a></tr>';
		});

		$("#contacts").empty().append(contact_row);

		 $(".contacts_list").click(function(e){
		 	var obj ={};
	    	var closest_tr = $(e.target).closest('tr');
	    	obj.first_name = closest_tr.attr('first_name');
	    	obj.last_name = closest_tr.attr('last_name');
	    	obj.home_phone = closest_tr.attr('home_phone');
	    	obj.land_phone = closest_tr.attr('land_phone');
	    	obj.email = closest_tr.attr('email');
	    	obj.address = closest_tr.attr('address');
            obj.contact_id = closest_tr.attr('contact_id');
	    	contactDetails(obj);
	    });
	};


    $("#edit_link").click(function(e){
        hideErrors();
        if(window.data){
            $("#first_name").val(window.data.first_name);
            $("#last_name").val(window.data.last_name);
            $("#user_email").val(window.data.email);
            $("#land_phone").val(window.data.land_phone);
            $("#home_phone").val(window.data.home_phone);
            $("#address").val(window.data.address);

            $("#create_modal").modal('show');

            $("#db_save").click(function(){
                var data ={};
                data.first_name = $("#first_name").val();
                data.last_name = $("#last_name").val();
                data.email = $("#user_email").val();
                data.land_phone = $("#land_phone").val();
                data.home_phone = $("#home_phone").val();
                data.address = $("#address").val();
                data.contact_id = window.data.contact_id;

                saveContact(data);
            });
        }else{
            alert("Please select altest one contact to edit !!")
        }

    });

    var showErrors = function(errors) {
        $.each(errors, function(id, message) {
            $("#" + id + "_danger").html(message);
            $("#" + id + "_group").addClass("has-error");
        });
    };

    var hideErrors = function() {
        $(".text-danger").html("");
        $(".form-group").removeClass("has-error");
        $(".help-danger").html("");
    };
    
    var showMessages = function(resp) {
        
        $("html, body").animate({ scrollTop: 0 }, 500);
        
        $("#messages").removeClass().addClass("alert").empty();
        if (!resp.message) {
            $("#messages").hide();
            return ;
        }
        var className = "";
        if (resp.status == "success") {
            className = "alert-success";
        } else if(resp.status == "info") {
            className = "alert-info";
        }else {
            className = "alert-danger";
        }
        $("#messages").addClass(className);
        $("#messages").append("<div>" + resp.message + "</div>");
        /*$.each(resp.messages, function(message) {
        });*/
        $("#messages").show();
    
    };

    $("#db_save").click(function(){
        var data ={};
        data.first_name = $("#first_name").val();
        data.last_name = $("#last_name").val();
        data.email = $("#user_email").val();
        data.land_phone = $("#land_phone").val();
        data.home_phone = $("#home_phone").val();
        data.address = $("#address").val();
        
        window.data = data;

        saveContact(data);

    });
});