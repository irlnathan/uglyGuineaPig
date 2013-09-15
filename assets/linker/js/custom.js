$(document).ready(function(){

	// $.getJSON('/user', function(result) {
	// 	console.log(result);
	// });

	// $.ajax('/user', {
	// 	type: 'POST',
	// 	data: {user: 'John Galt'},
	// 	success: function(result) {
	// 		console.log("this is the result: ",result);
	// 	}
	// })

	$('<audio id="chatAudio"><source src="/sounds/notify.ogg" type="audio/ogg"><source src="/sounds/notify.mp3" type="audio/mpeg"><source src="/sounds/notify.wav" type="audio/wav"></audio>').appendTo('body');

	$('#subscribe').on('click', function(){
		socket.get('/user', function(response){
      console.log(response);
    });
	});


	// LIST
	$('#list').on('click', function(){
		$('#chatAudio')[0].play();
		$('#output').html("");
		socket.get('/user', function(response){
			var output = $("<ul></ul>");
			output.append("<h2>Behold all of my creations:</h2>");
			$.each(response, function(index, value){
				
				output.append("<li>id: "+value.id+" - name: "+value.name+"</li>"	);
				$('#output').append(output);
			})
    });
	});

	$('#clear-list').on('click', function(){
		$('#output').html("");
	});

	// SMITE
	$('#smite').on('click', function(){
		var theID = $('#smite-id').val();
		$.ajax('/user/'+theID, {
			type: 'DELETE',
			success: function(result) {
				$('#smite-id').val("");
			}
    });
	});

	// UPDATE
	$('#update').on('click', function(){
		var theID = $('#update-id').val();
		var theText = $('#update-text').val();
		$.ajax('/user/'+theID, {
			type: 'PUT',
			data: {'name': theText},
			success: function(result) {
				$('#update-text').val("");
				$('#update-id').val("");
				$('#update-list').html("Behold my updated creation: "+result.name+"<br/>");
			}
    });
	});

	// CREATE
	$('#create').on('submit', function(event){
		event.preventDefault();

		$.ajax('/user', {
			type: 'POST',
			data: $('#create').serialize(),
			success: function(result) {
				$('#name-field').val("");
				$('#create-list').html("Behold my creation: "+result.name+"<br/>");
			}
		});
	});

});