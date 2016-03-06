//controller class

//create new game when button clicked (new model,new view)
document.getElementById('startButton').addEventListener('click',function(){
	var m = new Model(3,3);
	m.addPlayer("X");
	m.addPlayer("O");
	var v = new View(m,function(cell,row,col){
		cell.addEventListener('click',function(){
				m.makeMove(row,col);
				
				if(m.numOfMoves > 4){
					//check for winner or draw
					if(m.playerWin()){
						alert('a player has won!');
						m = null;
					}
					else if(m.isDraw()){
						alert('draw!');
						m = null;
					}
				}
			})
	});
	m.addChangeListeners(v);
	document.getElementById('startButton').style.display = 'none';
})
