var view = {

	initializeBoard: function() {
		var boardSize = 19;
		var boardTarget = document.getElementById('gameBoard');
		boardTarget.innerHTML = "";
		for (var i = 0; i < boardSize; i ++) {
			var row = document.createElement('tr');
			for (var j = 0; j < boardSize; j ++) {
				var cell = document.createElement('td');
				var column = i.toString();
				var roww = j.toString();
				if (column.length < 2) {
					column = "0" + column;
				}
				if (roww.length < 2) {
					roww = "0" + roww;
				}
				var cellId = roww + column;
				cell.setAttribute('id', cellId);
				row.appendChild(cell);
			}
			boardTarget.appendChild(row);
		}
		this.resizeBoard();
	},

	resizeBoard: function() {
		var $cells = $('#gameBoard td');
		$cells.height($cells.width());
	},

}

window.onload = function() {
		view.initializeBoard();
		$(window).resize(view.resizeBoard);
}

$(document).ready(function() {
	var clock;
	clock = $('.clock').FlipClock({
		clockFace: 'MinuteCounter',
		autoStart: false,
		language: 'fr',
		countdown: true,
		callbacks: {
			stop: function() {
				$('.clock-message').html('Mort subite !')
			}
		}
	});		
	clock.setTime(600);
	clock.start();
});

setInterval(function() {
	var id = urlParam('ID');
	$.get( "http://localhost:3000/turn/"+id, function( data ) {
		if(data.nbTenaillesJ1 == 0 || data.nbTenaillesJ1 == 1){
			$('#J1Tenaille').html('<p>'+ data.nbTenaillesJ1 +' Tenaille</p>');
		}
		else{
			$('#J1Tenaille').html('<p>'+ data.nbTenaillesJ1 +' Tenailles</p>');
		}	
		if(data.nbTenaillesJ2 == 0 || data.nbTenaillesJ2 == 1){
			$('#J2Tenaille').html('<p>'+ data.nbTenaillesJ2 +' Tenaille</p>');
		}
		else{
			$('#J2Tenaille').html('<p>'+ data.nbTenaillesJ2 +' Tenailles</p>');
		}
		for(var x = 0; x<data.tableau.length; x++){
			for(var y = 0; y<data.tableau.length; y++){
				var coordX = x.toString();
				var coordY = y.toString();
				if (coordX.length < 2) {
					coordX = "0" + coordX;
				}
				if (coordY.length < 2) {
					coordY = "0" + coordY;
				}
				switch(data.tableau[x][y]){
					case 1:
						addBlackPiece(coordX+coordY);
						break;
					case 2:
						addWhitePiece(coordX+coordY);
						break;
				}
			}
		}
	});
},500);

function GetPlayerID(){
	var playerID = document.getElementById("ID").value;
}
function GetServerIP(){
	var ServerIP = document.getElementById("IP").value;
}


function addWhitePiece(coordId)
{
	var piece = document.getElementById(coordId);
	$(piece).addClass("white_piece");
}

function addBlackPiece(coordId)
{
	var piece = document.getElementById(coordId);
	$(piece).addClass("black_piece");
}

function urlParam(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);
	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}