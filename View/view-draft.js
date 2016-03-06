function View(model,callback){
		//create table and append to body
	var t = document.createElement("TABLE");
	t.setAttribute("id","gameBoard");
	
	
	
	for(var i=0;i<model.rows;i++){

		//create row and append to table
		var r = document.createElement("TR");
		var rowId = i.toString();
		r.setAttribute("id",rowId);
		t.appendChild(r);

		for(var j=0;j<model.cols;j++){

			var c = document.createElement("TD");
			var cellId = rowId + j.toString();
			c.setAttribute("id",cellId);
			c.setAttribute("class","game-grid-cell");
			callback(c,i,j);
			t.appendChild(c);
		}
	}
	document.getElementById("boardWrap").appendChild(t);
}


View.prototype.setCellText = function(row,col,str){
	var text = document.createTextNode(str);
	var cell = row.toString()+col.toString();
	console.log(cell);
	document.getElementById(cell).appendChild(text);
}





