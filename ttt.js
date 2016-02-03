function createGrid(rows,cols){

	//create table and append to body
	var t = document.createElement("TABLE");
	t.setAttribute("id","gameBoard");
	document.body.appendChild(t);

	var alphabetIds = ["A","B","C","E","F","G","H","I"];
	var numberIds = ["1","2","3","4","5","6","7","8"];
	for(i=0;i<rows;i++){

		//create row and append to table
		var r = document.createElement("TR");
		var uniqId = alphabetIds[i];
		r.setAttribute("id",uniqId);
		document.getElementById("gameBoard").appendChild(r);

		for(j=0;j<cols;j++){

			var c = document.createElement("TD");
			var colId = uniqId + numberIds[j];
			c.setAttribute("id",colId);
			c.setAttribute("class","game-grid-cell");
			document.getElementById(uniqId).appendChild(c);
		}

	}

}

createGrid(3,3);

function setCellText(row,col,str){
	var text = document.createTextNode(str);
	var cell = row + col;
	document.getElementById(cell).appendChild(text);
}

setCellText("A","2","X");
