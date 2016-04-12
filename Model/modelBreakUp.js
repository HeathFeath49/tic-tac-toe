function main(){
	this.myChangeListeners = [];
}


function playerClass(){
	this.players = [];
	this.playerTurnIndex = 0;
}

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