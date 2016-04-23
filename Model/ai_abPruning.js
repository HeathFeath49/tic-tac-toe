//Perfect AI for Tic\\\\\\\\\\ Tac Toe 
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






function minMax(game,maxPlayer,alpha,beta){
	var check = gameOver(game);
	//base case: if there is a winner or a draw
	if(!(check === false)){
		//result['score'] = score;
		var score = [check];
		return score;
	}
	else{
		if(maxPlayer){
			var bestScore = ['r','c'];
		}
		else{
			var bestScore = ['r','c'];
		}
		//recursion
		for(var r=0;r<game.rows;r++){
			for(var c=0;c<game.cols;c++){
				//pre recursion
				var newGame = copyModel(game);
				if(newGame.makeMove(r,c) == "no move"){
					continue;
				}
				if(maxPlayer){
					
					var predict = minMax(newGame,false,alpha,beta);
	
					if(predict > alpha){
						alpha = predict[0];
						bestScore[0] = r;
						bestScore[1] = c;					
					}
					
				}
				else{
					var predict = minMax(newGame,true,alpha,beta);
					
					if(predict < beta){
						beta = predict[0];
						bestScore[0] = r;
						bestScore[1] = c;
					}
					
				}
				if(alpha >= beta){
					break;
				}
			}
		}return bestScore;
		 
	}
}