//Perfect AI for Tic Tac Toe 
//Recursive Algorithm
function copyBoard(board){
	var copy = [];
	for(var i=0; i<board.length;i++){
		copy.push(board[i]);
	}
	return copy;
}

function gameOver(){
	var outcome;
	if(this.isDraw()){
		outcome = 0;
		return outcome;
	}
	var winner = playerWin();
	if(!(winner = "")){
		if(winner = this.players[0]){
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

//board holding game with all player positions or lack of
//maxPlayer is a boolean

function minMax(board,maxPlayer){
	var check = gameOver();
	var maxVal = -Infinity;
	var minVal = Infinity;
	var predictedOutcome;

	//base case: if there is a winner or a draw
	if(!(check === false)){
		return maxVal;
	}

	//recursion
	for(var r=0;r<=this.rows;r++){
		for(var c=0;c<=this.cols;c++){
			//pre recursion
			var boardCopy = copyBoard(this.board);
			var newGame = new Model(this.rows,this.cols);
			newGame.board = boardCopy;
			newGame.makeMove(r,c);

			//recursion
			if(maxPlayer === true){
				predictedOutcome = minMax(newGame.board,false);
				if(predictedOutcome > maxVal){
					maxVal = predictedOutcome;
				}
			}
			else{
				predictedOutcome = minMax(newGame.board,true);
				if(predictedOutcome < minVal){
					minVal = predictedOutcome;
				}
			}
		}
	}
}
