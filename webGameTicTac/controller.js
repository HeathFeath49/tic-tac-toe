//controller class

//create new game when button clicked (new model,new view)
document.getElementById('startButton').addEventListener('click',function(){
	var m = new Model(3,3);
	m.addPlayer("X");
	m.addPlayer("O");
	var v = new View(m,function(cell,row,col){
		cell.addEventListener('click',function(){
				m.makeMove(row,col);
				console.log(m.board[row][col]);
			})
	});
	m.addChangeListeners(v);
})