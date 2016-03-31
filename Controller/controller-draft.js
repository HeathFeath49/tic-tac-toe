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

//AI CODE 
//ai testing
//Perfect AI for Tic Tac Toe 
//Recursive Algorithm


function copyModel(model){
	function copyBoard(){
    	var copy = [];
    	model.board.forEach(function(ele){
        	copy.push(ele.slice());
    	})
    	return copy;
	}
	var m = new Model(model.rows,model.cols);
	m.board = copyBoard(model);
	m.players = model.players;
	m.changeListeners = model.changeListeners;
	m.numOfMoves = model.numOfMoves;
	m.playerTurnIndex = model.playerTurnIndex;

	return m;

}


//board holding game with all player positions or lack of
//maxPlayer is a boolean

function gameOver(game){
	var outcome;
	if(game.isDraw()){
		outcome = 0;
		return outcome;
	}
	var winner = game.playerWin();

	if(!(winner === "")){
		if(winner === game.players[0]){
			outcome = 1;
			return outcome;
		}
		else{
			outcome = -1;
			return outcome;
		}
	}
	return false
} 

var result = {
	score:null,
	row:null,
	col:null
};

var bestMaxResultSoFar = {
	score: -Infinity
};

var bestMinResultSoFar = {
	score: Infinity
}

function minMax(game,maxPlayer,ai){
	console.log(JSON.stringify(game.board));
	var predictedOutcome;

	
	
	//base case: if there is a winner or a draw
	var check = gameOver(game);

	if(!(check === false)){
		result['score'] = check;
		
		return result;

	}
	else{


		//recursion
		for(var r=0;r<game.rows;r++){
			for(var c=0;c<game.cols;c++){
				//pre recursion
				result['row'] = r;
				result['col'] = c;
				/*console.log("row:" + r);
				console.log("col:" + c);*/
				var newGame = copyModel(game);

				

				if(newGame.makeMove(r,c) == "no move"){
					continue;
				}
				console.log(JSON.stringify(game.board));

				

				//recursion
				if(maxPlayer){
					
					predictedOutcome = minMax(newGame,false);
					
					if(predictedOutcome['score'] > bestMaxResultSoFar['score']){
						
						bestMaxResultSoFar['score'] = predictedOutcome['score'];
						bestMaxResultSoFar['row'] = result['row'];
						bestMaxResultSoFar['col'] = result['col'];
				
					}
				}
				else{
					predictedOutcome = minMax(newGame,true);
					
					if(predictedOutcome['score'] < bestMinResultSoFar['score']){

						bestMinResultSoFar['score'] = predictedOutcome['score'];
						bestMinResultSoFar['row'] = result['row'];
						bestMinResultSoFar['col'] = result['col'];
						

					
					}
				}
			}
		}
		 
	}
	if(ai === 'Max'){
		return bestMaxResultSoFar;
	}
	else{
		return bestMinResultSoFar;
	}
	
}

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
				var myWorker = new Worker('../Model/ai_test.js');
				var modelAsString = JSON.stringify(m.board);
				myWorker.postMessage(modelAsString);



				/*var computer = minMax(m,false,'Min');
				console.log(computer);
				m.makeMove(computer['row'],computer['col']);*/
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


