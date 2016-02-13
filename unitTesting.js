//unit testing for Tic Tac Toe scripts
"use strict";


/////////////////////////////////////////
//Tested: Passed
var gameState = [[1,2,3],[4,5,6],[7,8,9]];

var boardCopy = [];
for(var i=0; i<gameState.length;i++){
	boardCopy.push(gameState[i]);

}

//console.log(boardCopy);//should return [[1,2,3],[4,5,6],[7,8,9]];
///////////////////////////////////////////


//////////////////////////////////////////
//Tested: Passed
function Model(rows,cols){
		this.rows = rows;
		this.cols = cols;
		this.players = [];
		this.playerTurnIndex = 0;
		this.numOfMoves = 0;
		this.board = [];
		for(var i=0;i<rows;i++){
			this.board.push([]);
			for(var j=0;j<cols;j++){
				this.board[i].push([""]);
			}
		}
};

var m = new Model(3,3);
//console.log(m);

//////////////////////////////////////////////
//Tested: Passed
Model.prototype.addPlayer = function(str){
	this.players.push(str);
};
m.addPlayer("X");
m.addPlayer("O");
//console.log(m.players); //should return ['X','O']
/////////////////////////////////////////////

/////////////////////////////////////////////
//Tested: Passed
Model.prototype.isValidMove = function(row,col){
	if(this.board[row][col] == "" && row >= 0 && col >= 0){
		return true;
	}
	else {
		return false;
	}
};

//m.board[2][1] = "X";
//console.log(m.isValidMove(2,2));//return true
//console.log(m.isValidMove(2,1));//return false
/////////////////////////////////////////////

/////////////////////////////////////////////
//Tested: Failed

Model.prototype.makeMove = function(row,col){
	//if(this.isValidMove(row,col)){
		//update board array
		this.board[row][col] = players[playerTurnIndex];
		this.numOfMoves += 1;
		console.log('got here');
		if(this.playerTurnIndex === 0){
			this.playerTurnIndex = 1;
		}
		else{
			this.playerTurnIndex = 0;
		} 
 };
 
 //m.makeMove(0,0);
 //console.log(m.board[0][0]);
 //console.log(m.playerTurnIndex);
//////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Tested: Passed
 Model.prototype.playerWin = function(){

 	for(var p=0;p<=this.players.length;p++){
 		
 		for(var i=0;i<this.rows;i++){
 			//check horizontal
 			//Tested: Passed
 			if(this.board[i][0] == this.players[p] && this.board[i][1] == this.players[p] && this.board[i][2] == this.players[p]){
 				//winner
 				return this.players[p];
 			}
 			//check vertical
 			//Tested: Passed	
			if(this.board[0][i] == this.players[p] && this.board[1][i] == this.players[p] && this.board[2][i]){
				return this.players[p];
			}
		}
		//check diagonal
		//Tested: Passed 
		if(this.board[0][0] == this.players[p] && this.board[1][1] == this.players[p] && this.board[2][2] == this.players[p]){
			return this.players[p];
		}
		if(this.board[2][0] == this.players[p] && this.board[1][1] == this.players[p] && this.board[0][2] == this.players[p]){
			return this.players[p];
		}
 	}
 	return "";
 };


m.board[0][2] = m.players[0];
m.board[1][2] = m.players[1];
m.board[2][2] = m.players[0];
console.log(m.playerWin());
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////
//Tested:
Model.prototype.isDraw = function(){
	if(this.numOfMoves = 9 && (this.playerWin() === "")){
		return true;
	}
	else{
		return false;
	}
};
m.board[0][0] = m.players[0];
m.board[0][1] = m.players[1];
m.board[0][2] = m.players[0];
m.board[1][0] = m.players[0];
m.board[1][1] = m.players[1];
m.board[1][2] = m.players[1];
m.board[2][0] = m.players[1];
m.board[2][1] = m.players[0];
m.board[2][2] = m.players[0];
m.numOfMoves = 9;

//console.log(m.isDraw()); //return true
/////////////////////////////////////////

////////////////////////////////////////
Model.prototype.newGame = function(rows,cols){
	Model(rows,cols);
	//reset view
};
/////////////////////////////////////////

///////////////////////////////////////////
Model.prototype.getPlayer = function(row,col){
	return this.board[row][col];
};
///////////////////////////////////////////
