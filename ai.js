//Perfect AI for Tic Tac Toe 
//Recursive Algorithm

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

function minMax(gameState){
	var check = gameOver();
	//base case: if there is a winner or a draw
	if(!(check === false)){
		return check;
	}
	//recursion
	

}
