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
	var check = gameOver(game);
	//base case: if there is a winner or a draw
	if(!(check === false)){
		//result['score'] = score;
		var score = [check];
		return score;
	}
	else{
	

		
		if(maxPlayer){
			var bestScore = [-Infinity,'r','c'];
		}
		else{
			var bestScore = [Infinity,'r','c'];
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
					
					var predict = minMax(newGame,false);
	
					if(predict[0] > bestScore[0]){
						bestScore[0] = predict[0];
						bestScore[1] = r;
						bestScore[2] = c;
			
						//console.log(bestResults);
					
					}
				}
				else{
					var predict = minMax(newGame,true);
					
					if(predict[0] < bestScore[0]){
						bestScore[0] = predict[0];
						bestScore[1] = r;
						bestScore[2] = c;
					}
				}
			}
		}return bestScore;
		 
	}
}