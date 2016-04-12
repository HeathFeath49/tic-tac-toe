//controller class
//WEB WORKER

/*if(window.Worker){

	var myWorker = new Worker('ai_test.js');
	onmessage = function(e){
		console.log('message recieved from script');
		var result = minMax(e.board,false);
		postMessage(result);			
	}

	myWorker.onmessage = function(e){
		console.log('message recieved from Worker');
		result.textContent = e.data;  //do something with results from worker (makeMove func)
	}

}*/



function checkState(game){
	if(game.numOfMoves > 4){
		//check for winner or draw
		if(game.playerWin()){
			alert('a player has won!');
			game = null;
		}
		else if(game.isDraw()){
			alert('draw!');
			game = null;
		}
	}
}


//create new game when button clicked (new model,new view)
document.getElementById('startButton').addEventListener('click',function(){
	var m = new Model(3,3);
	m.addPlayer("X");
	m.addPlayer("O");
	m.playerTurnIndex = m.numOfMoves % m.players.length;
	var v = new View(m,function(cell,row,col){
		cell.addEventListener('click',function(){
				
				m.makeMove(row,col);
				console.log(JSON.stringify(m.board));
				checkState(m);

				//have ai make move using web worker
				/*var myWorker = new Worker('../Model/ai_test.js');
				var modelAsString = JSON.stringify(m.board);
				myWorker.postMessage(modelAsString);*/



				var computer = minMax(m,false);
				m.makeMove(computer[1],computer[2]);
				//console.log(JSON.stringify(m.board));
				checkState(m);
				
			})
	});
	m.addChangeListeners(v);
	document.getElementById('startButton').style.display = 'none';
})


/*document.getElementById('startButton').addEventListener('click',function(){
	var myWorker = new Worker('../Controller/worker_test.js');
	myWorker.postMessage('THE WORKER WORKS!');

})*/



