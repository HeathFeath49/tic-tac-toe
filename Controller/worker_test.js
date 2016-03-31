self.onmessage = function(event){
	console.log('message recieved from main script');
	alertToUser(event.data);
}

function alertToUser(msg){
	console.log(msg);
}