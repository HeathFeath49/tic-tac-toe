//model for tic tac toe
"use strict";

/*//web worker event handler
self.onmessage(function(e){
	console.log('recieved message from main script');
	//var revertModel = JSON.parse(e.data);
	//console.log(revertModel);
})
*/

/**
 * @constructor
 * @param {number} row - number of rows in table
 * @param {number} col - number of columns in each row
**/
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

 Model.prototype.playerWin = function(){

 	for(var p=0;p<this.players.length;p++){
 		//check horizontal
 		if(this.board[0][0] == this.players[p] && this.board[0][1] == this.players[p] && this.board[0][2] == this.players[p]){
 			return this.players[p];
 		}
 		if(this.board[1][0] == this.players[p] && this.board[1][1] == this.players[p] && this.board[1][2] == this.players[p]){
 			return this.players[p];
 		}
 		if(this.board[2][0] == this.players[p] && this.board[2][1] == this.players[p] && this.board[2][2] == this.players[p]){
 			return this.players[p];
 		}

 		//check vertical
 		if(this.board[0][0] == this.players[p] && this.board[1][0] == this.players[p] && this.board[2][0] == this.players[p]){
 			return this.players[p];
 		}
 		if(this.board[0][1] == this.players[p] && this.board[1][1] == this.players[p] && this.board[2][1] == this.players[p]){
 			return this.players[p];
 		}
 		if(this.board[0][2] == this.players[p] && this.board[1][2] == this.players[p] && this.board[2][2] == this.players[p]){
 			return this.players[p];
 		}

 		//check diagonal
 		if(this.board[2][0] == this.players[p] && this.board[1][1] == this.players[p] && this.board[0][2] == this.players[p]){
 			return this.players[p];
 		}
 		if(this.board[0][0] == this.players[p] && this.board[1][1] == this.players[p] && this.board[2][2] == this.players[p]){
 			return this.players[p];
 		}
 		
 			
 		

 	}
 	return "";
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

Model.prototype.addChangeListeners = function(f){
	this.myChangeListeners.push(f);
}

Model.prototype.notifyOfChanges = function(type){
	for(var i=0;i< this.myChangeListeners.length;i++){
		this.myChangeListeners[i]({change:type});
	}
}


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
var results = {
	score:5
};

var bestResults = {
	score:null
};


function minMax(game,maxPlayer){
	
	


	var score = gameOver(game);
	if(maxPlayer){
		results['score'] = -Infinity;
	}
	else{
		results['score'] = Infinity;
	}

	//base case: if there is a winner or a draw
	if(!(score === false)){
		//result['score'] = score;
		return score;
	}
	else{
	
		//recursion
		for(var r=0;r<game.rows;r++){
			for(var c=0;c<game.cols;c++){
				//pre recursion
				
				var newGame = copyModel(game);
				if(newGame.makeMove(r,c) == "no move"){
					continue;
				}
				
				
				if(maxPlayer){
					
					results['score'] = minMax(newGame,false);
	
					if(results['score'] > bestResults['score']){
						bestResults['score'] = results['score'];
						bestResults.row = r;
						bestResults.col = c;
						//console.log(bestResults);
					
					}
				}
				else{
					results['score'] = minMax(newGame,true);
					
					if(results['score'] < bestResults['score']){
						bestResults['score'] = results['score'];
						bestResults.row = r;
						bestResults.col = c;
					}
				}
			}
		}return bestResults;
		 
	}
}

var m = new Model(3,3);
m.addPlayer("X");
m.addPlayer("O");
/*
m.board[0][0] = "";
m.board[0][1] = "";
m.board[0][2] = "";
//
m.board[1][0] = "";
m.board[1][1] = "";
m.board[1][2] = "";
//
m.board[2][0] = "";
m.board[2][1] = "";
m.board[2][2] = "";


var h = minMax(m,true);
console.log(h['row']);*/

//returns 1
//Test: Passed
/*m.board[0][0] = m.players[1];
m.board[0][1] = m.players[0];
m.board[0][2] = m.players[0];
//
m.board[1][0] = "";
m.board[1][1] = m.players[0];
m.board[1][2] = m.players[1];
//
m.board[2][0] = "";
m.board[2][1] = m.players[0];
m.board[2][2] = m.players[1];
//m.numOfMoves += 7;

console.log(minMax(m,true));*/

//returns -1
//Test: Passed 
m.board[0][0] = "";
m.board[0][1] = "";
m.board[0][2] = "";
//
m.board[1][0] = "";
m.board[1][1] = "";
m.board[1][2] = "";
//
m.board[2][0] = "";
m.board[2][1] = "";
m.board[2][2] = "";

m.makeMove(0,0);
m.makeMove(0,2);
m.makeMove(1,0);
m.makeMove(1,1);
m.makeMove(0,1);
console.log(m.board);

console.log(minMax(m,false));;

//returns 0
//Test:

/*m.board[0][0] = m.players[0];
m.board[0][1] = m.players[1];
m.board[0][2] = m.players[0];
//
m.board[1][0] = m.players[1];
m.board[1][1] = m.players[0];
m.board[1][2] = m.players[0];
//
m.board[2][0] = "";
m.board[2][1] = m.players[1];
m.board[2][2] = m.players[1];
m.numOfMoves += 8;*/
/*m.playerTurnIndex = m.numOfMoves % m.players.length;*/
/*console.log(minMax(m,true));*/