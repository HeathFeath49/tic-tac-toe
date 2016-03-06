//model-draft
//break up Model Class

function gameClass(){
	this.players = [];
	this.playerTurnIndex = 0;
	this.numOfMoves = 0;
}




function boardClass(){
	this.rows;
	this.cols;
	this.changeListeners = [];
	this.board = [];
	for(var i=0;i<this.rows;i++){
		this.board.push([]);
		for(var j=0;j<this.cols;j++){
			this.board[i].push([""]);
		}
	}
}
