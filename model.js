//model for tic tac toe



/**
 * @constructor
 * @param {number} row - number of rows in table
 * @param {number} col - number of columns in each row
**/
function Model(row,col){
		this.row = row;
		this.col = col;
		var players = [];
		this.playerTurnIndex = players.length();
		this.numOfMoves = 0;
		this.board = [];
		for(var i=0;i<row;i++){
			this.board.push([]);
			for(j=0;j<col;j++){
				this.board[i].push([""]);
			}
		}
}

/**
 * adds a new player to the game by pushing to the players array
 * @param {string} str - a string that will represent the player's piece on the board
**/

Model.prototype.addPlayer = function(str){
	this.players.push(str);
	this.playerTurnIndex = players.length();
}

/**
 * returns true when "cell" at index [row][col] is empty
 * @param {number} row - the row number
 * @param {number} col - the number of the col located in row
 **/

Model.prototype.isValidMove = function(row,col){
	if(this.board[row][col] == ""){return true}
		else{return false}
}

/**
 * if the player's move is valid, updates board in model and updates whose turn it is
 * @param {number} row - the number of the row on board
 * @param {number} col - the number of the col located in row
**/

Model.prototype.makeMove = function(row,col){
	if(isValidMove(row,col)){
		//update board array
		this.board[row][col] = players[playerTurnIndex];
		this.numOfMoves += 1;
		if(this.playerTurnIndex === 0){
			this.playerTurnIndex = 1;
		}
		else{
			this.playerTurnIndex = 0;
		} 
 }

 /**
  * checks for win (horizontal,vertical,diagonal)
 **/

 Model.prototype.playerWin = function(){

 	for(var player in players){
 		
 		for(vari=0;i<this.row;i++){
 			//check horizontal
 			if(this.board[i][0] == player && this.board[i][1] == player && this.board[i][2] == player){
 				//winner
 				return player;
 			}
 			//check vertical	
			if(this.board[0][i] == player && this.board[1][i] == player && this.board[2][i]){
				return player;
			}
		}
		//check diagonal 
		if(this.board[0][0] == player && this.board[1][1] == player && this.board[2][2] == player){
			return player;
		}
		if(this.board[2][0] == player && this.board[1][1] == player && this.board[0][2] == player){
			return player;
		}

 	}
 }

 /**
  * true when there is a draw (the board is full and there is no winner)
 **/

Model.prototype.isDraw = function(){
	if(this.numOfMoves > 9 && !(playerWin()){
		return true;
	}
}

/**
 * resets the game by calling to the Model function which sets
 * parameters for the game based on the number of rows and cols given
 * @param {number} rows - number of rows on board
 * @param {number} cols - number of columns per row
**/

Model.prototype.newGame = function(rows,cols){
	Model(rows,cols);
	//reset view
}

/**
 * returns player at a given row and column
 * @param {number} row - number of row on board
 * @param {number} col - number of column in row
**/


Model.prototype.getPlayer = function(row,col){
	if(!(this.board[row][col] == ""){
		return this.board[row][col];
	}
}







