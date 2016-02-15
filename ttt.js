function createGrid(rows,cols){

	//create table and append to body
	var t = document.createElement("TABLE");
	t.setAttribute("id","gameBoard");
	

	
	for(var i=0;i<rows;i++){

		//create row and append to table
		var r = document.createElement("TR");
		var rowId = i.toString();
		r.setAttribute("id",rowId);
		t.appendChild(r);

		for(var j=0;j<cols;j++){

			var c = document.createElement("TD");
			var colId = rowId + j.toString();
			c.setAttribute("id",colId);
			c.setAttribute("class","game-grid-cell");
			t.appendChild(c);
		}
	}
	document.body.appendChild(t);
}

createGrid(3,3);

function setCellText(row,col,str){
	var text = document.createTextNode(str);
	var cell = row + col;
	document.getElementById(cell).appendChild(text);
}

setCellText("2","2","X");
