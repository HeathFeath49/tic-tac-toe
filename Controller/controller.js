//controller class

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

function minMax(game,maxPlayer){
	game.playerTurnIndex = game.numOfMoves % game.players.length;
	/*console.log(game.board);*/
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
					//console.log(predictedOutcome);
					if(predictedOutcome['score'] < bestMinResultSoFar['score']){

						bestMinResultSoFar['score'] = predictedOutcome['score'];
						bestMinResultSoFar['row'] = result['row'];
						bestMinResultSoFar['col'] = result['col'];
						

					
					}
				}
			}
		}
		 
	}
	if(maxPlayer == true){
		return bestMaxResultSoFar;
	}
	else{
		return bestMinResultSoFar;
	}
}

//create new game when button clicked (new model,new view)
document.getElementById('startButton').addEventListener('click',function(){
	var m = new Model(3,3);
	m.addPlayer("X");
	m.addPlayer("O");
	var v = new View(m,function(cell,row,col){
		cell.addEventListener('click',function(){
				m.makeMove(row,col);
				
				if(m.numOfMoves > 4){
					//check for winner or draw
					if(m.playerWin()){
						alert('a player has won!');
						m = null;
					}
					else if(m.isDraw()){
						alert('draw!');
						m = null;
					}
				}
				//have ai make move


			})
	});
	m.addChangeListeners(v);
	document.getElementById('startButton').style.display = 'none';
})
