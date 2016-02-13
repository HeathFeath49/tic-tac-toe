//model for tic tac toe
"use strict";



/**
 * @constructor
 * @param {number} row - number of rows in table
 * @param {number} col - number of columns in each row
**/
function Model(rows,cols){
		this.rows = rows;
		this.cols = cols;
		this.players = [];
		this.playerTurnIndex = players.length;
		this.numOfMoves = 0;
		this.board = [];
		for(var i=0;i<rows;i++){
			this.board.push([]);
			for(var j=0;j<cols;j++){
				this.board[i].push([""]);
			}
		}
};

/**
 * adds a new player to the game by pushing to the players array
 * @param {string} str - a string that will represent the player's piece on the board
**/

Model.prototype.addPlayer = function(str){
	this.players.push(str);
};

/**
 * returns true when "cell" at index [row][col] is empty
 * @param {number} row - the row number
 * @param {number} col - the number of the col located in row
 **/

Model.prototype.isValidMove = function(row,col){
	if(this.board[row][col] == "" && row >= 0 && col >= 0){return true;}
		else{return false;}
};

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
 };

 /**
  * checks for win (horizontal,vertical,diagonal)
  * @return {string} 
 **/

 Model.prototype.playerWin = function(){

 	for(var p=0;p<=this.players.length;p){
 		
 		for(var i=0;i<this.row;i++){
 			//check horizontal
 			if(this.board[i][0] == this.players[p] && this.board[i][1] == this.players[p] && this.board[i][2] == this.players[p]){
 				//winner
 				return this.players[p];
 			}
 			//check vertical	
			if(this.board[0][i] == this.players[p] && this.board[1][i] == this.players[p] && this.board[2][i]){
				return this.players[p];
			}
		}
		//check diagonal 
		if(this.board[0][0] == this.players[p] && this.board[1][1] == this.players[p] && this.board[2][2] == this.players[p]){
			return this.players[p];
		}
		if(this.board[2][0] == this.players[p] && this.board[1][1] == this.players[p] && this.board[0][2] == this.player[p]){
			return this.players[p];
		}
		else{
			return "";
		}

 	}
 };

 /**
  * true when there is a draw (the board is full and there is no winner)
  *@return {boolean}
 **/

Model.prototype.isDraw = function(){
	if(this.numOfMoves = 9 && !(this.playerWin())){
		return true;
	}
	else{
		return false;
	}
};

/**
 * resets the game by calling to the Model function which sets
 * parameters for the game based on the number of rows and cols given
 * @param {number} rows - number of rows on board
 * @param {number} cols - number of columns per row
**/

Model.prototype.newGame = function(rows,cols){
	Model(rows,cols);
	//reset view
};

/**
 * returns player at a given row and column
 * @param {number} row - number of row on board
 * @param {number} col - number of column in row
**/


Model.prototype.getPlayer = function(row,col){
	return this.board[row][col];
};












