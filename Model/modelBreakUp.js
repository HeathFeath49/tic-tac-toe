"use strict";
//model class
//Test
//game rules class
function gameRulesClass(){
	this.myChangeListeners = [];
};

gameRulesClass.prototype.notifyOfChanges = function(type){
	for(var i=0;i< this.myChangeListeners.length;i++){
		this.myChangeListeners[i]({change:type});
	}
};

gameRulesClass.prototype.addChangeListeners = function(f){
	this.myChangeListeners.push(f);
};

gameRulesClass.prototype.isDraw = function(){
	var check = this.playerWin();
	if((this.numOfMoves === 9) && (check === "")){
		return true;
	}
	else{
		return false;
	}
};

gameRulesClass.prototype.isValidMove = function(row,col){

	if(this.board[row][col] == ""){
		return true;
	}
	else {
		return false;
	}
};

gameRulesClass.prototype.playerWin = function(){

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


//player class
function playerClass(players){
	this.players = [];
	this.playerTurnIndex = 0;
	for(var p=0;p<arguments.length;p++){
		this.addPlayer(arguments[p]);
	}
}

playerClass.prototype.addPlayer = function(str){
	this.players.push(str);
};

playerClass.prototype.getPlayer = function(row,col){
	return this.board[row][col];
};


//board class
function boardClass(rows,cols){
	this.rows = rows;
	this.cols = cols;
	this.board = [];
	this.numOfMoves = 0;
	for(var i=0;i<rows;i++){
		this.board.push([]);
		for(var j=0;j<cols;j++){
			this.board[i].push([""]);
		}
	}
}

boardClass.prototype.makeMove = function(row,col){
	
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

function ticTacToe(){
	this.bClass = new boardClass(3,3);
	this.pClass = new playerClass('X','O');
	this.gClass = new gameRulesClass();
}



var x = new ticTacToe();
console.log(x.gClass.isValidMove());
/*x.bClass.makeMove(1,1);
*/
