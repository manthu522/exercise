
$(document).ready(function () {

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
        		console.log(resp);
        		prepareData(resp);
        		
        	},
        	error : function(err){
        		console.log("ERROR while fetching contacts ::",err);
        	}
        });

    }(jQuery));

    var contactDetails = function(contact){
    	console.log("JJJJ", contact)
    	$("#d_name").html('<b>'+contact.first_name+' '+contact.last_name);
    	detail_row = '<tr><td> <b>'+contact.first_name+' '+contact.last_name +'</b></td></tr>';
		var details_li = '';

		details_li += '<li class="list-group-item"> <h4 class="list-group-item-heading">mobile</h4>'+contact.home_phone+' <i class="phole-icon glyphicon glyphicon-earphone"></i>   <i class="glyphicon icon-chat"></i> </li>';
		details_li += '<li class="list-group-item"> <h4 class="list-group-item-heading">home</h4>'+contact.land_phone+' <i class="phole-icon glyphicon glyphicon-earphone"></i></li>';
		details_li += '<li class="list-group-item"> <h4 class="list-group-item-heading">email</h4>'+contact.email+'</li>';
		details_li += '<li class="list-group-item"> <h4 class="list-group-item-heading">address</h4>'+contact.address+'</li>';    	

    	$("#details").empty().append(details_li);


    }

	$("#new_contact").click(function(){
		//$( "#test" ).load( "add_contact.html" );
		$("#create_modal").modal('show');

		$("#db_save").click(function(){
			var data ={};
			data.first_name = $("#first_name").val();
			data.last_name = $("#last_name").val();
			data.email = $("#user_email").val();
			data.land_phone = $("#land_phone").val();
			data.home_phone = $("#home_phone").val();
			data.address = $("#address").val();

			saveContact(data);

		});

	});

	var saveContact = function(data){
		console.log(JSON.stringify(data));
		$.ajax({
        	type : "POST",
        	contentType: "application/json",
        	url : "http://localhost:9999/contact/create",
        	data : JSON.stringify(data),
        	success : function(resp){
        		console.log(resp)
        		if(resp.status === 'success'){
        			location.reload();
        			$(".alert-success").text(resp.message);
        			
        		}else{
        			$("#error_messages").text(resp.message);
        		}
        		//$("#create_modal").modal('close');
        		//prepareData(resp);
        	},
        	error : function(err){
        		console.log(err);
        	}

		});
	};


	var prepareData = function(resp){
		var contact_row = '';
		$.each(resp.data, function( index, contact ) {
		  	contact_row += '<tr first_name="'+contact.first_name+'" last_name="'+contact.last_name+'" address="'+contact.address+'" land_phone="'+contact.land_phone+'" home_phone="'+contact.home_phone+'" email="'+contact.email+'"><td> <a class="contacts_list" href="javascript:void(0)">'+contact.first_name+' <b>'+contact.last_name +'</b></td></a></tr>';
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
	    	contactDetails(obj);
	    });
	};

});