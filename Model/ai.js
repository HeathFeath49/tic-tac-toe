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

function minMax(game,maxPlayer){
	var predictedOutcome;
	var minVal = Infinity;
	var maxVal = -Infinity;	
	
	function gameOver(){
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

	

	//base case: if there is a winner or a draw
	var check = gameOver();
	if(!(check === false)){
		console.log(check);
		return check;

	}


	//recursion
	for(var r=0;r<game.rows;r++){
		for(var c=0;c<game.cols;c++){
			//pre recursion
			
			/*console.log("row:" + r);
			console.log("col:" + c);*/
			var newGame = copyModel(game);
			

			if(newGame.makeMove(r,c) == "no move"){
				continue;
			}
			

			//recursion
			if(maxPlayer){
				/*console.log('got here');*/
				predictedOutcome = minMax(newGame,false);
				if(predictedOutcome > maxVal){
					maxVal = predictedOutcome;
				}
			}
			else{
				predictedOutcome = minMax(newGame,true);
				//console.log(predictedOutcome);
				if(predictedOutcome < minVal){
					minVal = predictedOutcome;
				}
			}
		}
	}
}