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
	//base case: if there is a winner or a draw
	if(!(check === false)){
		return check;
	}
	//recursion
	for(var r=0;r<=this.rows;r++){
		for(var c=0;c<=this.cols;c++){
			var newBoard = copyBoard(board);
			this.makeMove()
		}
	}


}
