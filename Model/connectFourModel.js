//mod el for tic tac toe
"use strict";



/*
 * @constructor
 * @param {number} row - number of rows in table
 * @param {number} col - number of columns in each row
 */
function Model(rows,cols){
		this.rows = rows;
		this.cols = cols;
		this.players = [];
		this.numOfMoves = 0;
		this.playerTurnIndex = 0;
		this.board = [];
		this.myChangeListeners = [];
		for(var i=0;i<rows;i++){
			this.board.push([]);
			for(var j=0;j<cols;j++){
				this.board[i].push([""]);
			}
		}
};

/**
 * adds a new player to the game by pushing to the players array
*
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

	if(this.board[row][col] == ""){
		return true;
	}
	else {
		return false;
	}
};


/**
 * if the player's move is valid, updates board in model and updates whose turn it is
 * @param {number} row - the number of the row on board
 * @param {number} col - the number of the col located in row
**/

Model.prototype.makeMove = function(row,col){
	
	if(this.isValidMove(row,col)){
		//update board array
		this.board[row][col] = this.players[this.playerTurnIndex];
		this.numOfMoves += 1;
		

		//notify "subscribers" to change!
		for(var s=0; s<this.myChangeListeners.length;s++){
			var thisView = this.myChangeListeners[s];
			thisView.setCellText(row,col,this.players[this.playerTurnIndex]);
		}
		this.playerTurnIndex = this.numOfMoves % this.players.length;

	}
	else{
		return "no move";
	}
};

 /**
  * checks for win (horizontal,vertical,diagonal)
  * @return {string} 
 **/

 Model.prototype.playerWin = function(num_needed){
 	
 	for(var r=0;r<this.rows;r++){
 		for(var c=0;c<this.cols;c++){

 			//check if player in box
 			if(!(this.getPlayer(r,c)=='')){
 				
 				//get player we are working with 
 				var currentPlayer = this.getPlayer(r,c);
 				var numOfRows = this.rows-1;
 				var numOfCols = this.cols-1;
 				
 				//check if horizontal win is possible
 				if((numOfCols-c) >= (num_needed-1)){
 					
 					var consecutiveNum = 1;
 					var sequenceBroken = false;
 					//check for win
 					while((sequenceBroken === false) && (consecutiveNum !== num_needed)){
 						//check next box
 						
 						if(this.board[r][c+consecutiveNum] == currentPlayer){
 							/*console.log(c+consecutiveNum);*/
							consecutiveNum += 1;
 						}
 						else{
 							/*console.log('here');*/
 							sequenceBroken = true;
 						}
					}

 				}
 				//check if vertical win is possible
 				if((numOfRows-r) >= (num_needed-1)){
 					consecutiveNum = 1;
 					sequenceBroken = false;

 					//check for win
 					while((sequenceBroken === false) && (consecutiveNum !== num_needed)){
 						if(this.board[r+consecutiveNum][c] == currentPlayer){
 							consecutiveNum += 1;
 						}
 						else{
 							sequenceBroken = true;
 						}
 					}
 					/*if(consecutiveNum == num_needed){
 						console.log('player won');
 						break;
 					}
 					else{
 						console.log('no winner');
 						break;
 					}*/
				}
				//check if diagonal win possible (left)

				if(c+1 < num_needed){
					//check for left diag win
					consecutiveNum = 1;
					sequenceBroken = false;

					while((sequenceBroken === false) && (consecutiveNum !== num_needed)){
						//console.log(this.board[r+consecutiveNum][c-consecutiveNum]);
						if(this.board[r+consecutiveNum][c-consecutiveNum] == currentPlayer){
							consecutiveNum += 1;
						}
						else{
							sequenceBroken = true;
						}
					}
					if(consecutiveNum == num_needed){
 						console.log('player won');
 						
 					}
 					else{
 						console.log('no winner');
 						
 					}

				}
			}

		}
 	}
 }

 /**
  * true when there is a draw (the board is full and there is no winner)
  *@return {boolean}
 **/
Model.prototype.isDraw = function(){
	var check = this.playerWin();
	if((this.numOfMoves === 9) && (check === "")){
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
	var newGame = new Model(rows,cols);
	//reset view
};

/**
 * returns player at a given row and column
 * @param {number} row - number  of row on board
 * @param {number} col - number of column in row
**/


Model.prototype.getPlayer = function(row,col){
	return this.board[row][col];
};


var m = new Model(3,3);
m.addPlayer('X');
m.addPlayer('O');
m.board[0][2] = 'O';
m.board[1][1] = 'O';
m.board[2][0] = 'O';

//m.board[0][2] = 'X';
/*m.makeMove(1,2);*/
//console.log(m.board);

m.playerWin(3);

