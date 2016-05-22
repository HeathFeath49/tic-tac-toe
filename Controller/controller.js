//controller class
function checkState(game){
	if(game.numOfMoves > 4){
		//check for winner or draw
		var winner = game.playerWin();
		if(winner){
			alert(winner.toString() + ' has won!');
			game = null;
			window.location.reload();
		}
		else if(game.isDraw()){
			alert('draw!');
			game = null;
			window.location.reload();
		}
	}
}


//create new game when button clicked (new model,new view)
document.getElementById('startButton').addEventListener('click',function(){
	var m = new Model(3,3);
	m.addPlayer("X");
	m.addPlayer("O");
	m.playerTurnIndex = m.numOfMoves % m.players.length;
	var v = new View(m,function(cell,row,col){
		cell.addEventListener('click',function(){
			if(m){
					m.makeMove(row,col);
					checkState(m);
					
					var computer = minMax(m,false);
					m.makeMove(computer[1],computer[2]);
					checkState(m);
				}
				
			})
	});
	m.addChangeListeners(v);
	document.getElementById('startButton').style.display = 'none';
})






