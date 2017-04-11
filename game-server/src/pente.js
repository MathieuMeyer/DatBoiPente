class Pente{
	constructor() {
		this.winner;
		this.player = Math.floor(Math.random()*(2)+1);
		this.nbOfClampPlayerOne = 0;
		this.nbOfClampPlayerTwo = 0;
		this.round = 0;
		this.gameBoard = new Array();
		this.gameState = updateGameState(this.player, this.nbOfClampPlayerOne, this.nbOfClampPlayerTwo, this.round);
	}
	gameStart(){
		while(this.winner == undefined){
			this.round++;
			if(this.round > 60){
				//Partie terminée
				returnError();
				break;
			}
			if(nextBoard(place_pion)){
				checkWinner();
			}else{
				returnError();
				break;
			}
		}
	}
	nextBoard(place_pion){
		//Out of bounds
		if(place_pion[0]<0 || place_pion[0]>18 || place_pion[1]<0 || place_pion[1]>18){
			return false;
		}
		if(this.round == 3 && place_pion[0]<7 || place_pion[0]>11 || place_pion[1]<7 || place_pion[1]>11 ){
			return false;
		}
		if(this.player == 1){
			//player 1 -> pièce blanche
			var piece = new Array();
			piece[place_pion[0]][place_pion[1]] = "W";
			this.gameBoard.push(piece);
			updateGameState(this.player, this.nbOfClampPlayerOne, this.nbOfClampPlayerTwo, this.round++);
			return true;
		}
		else{
			//player 2 -> pièce noire
			var piece = new Array();
			piece[place_pion[0]][place_pion[1]] = "B";
			this.gameBoard.push(piece);
			updateGameState(this.player, this.nbOfClampPlayerOne, this.nbOfClampPlayerTwo, this.round++);
			return true;
		}

	}
	checkWinner(){
		checkNewClamps();
		if(this.nbOfClampPlayerOne == 5 || checkFivePiecesAlignment()){
			this.winner = 1;
		}
		if(this.nbOfClampPlayerTwo == 5 || checkFivePiecesAlignment()){
			this.winner = 2;
		}
	}
	checkNewClamps(){
		alreadyScannedPieces[];
		piecesToDelete[];
		var colorOne = this.player == 1 ? "W" : "B";
		var colorTwo = this.player != 1 ? "B" : "W";
		for(var i=0; gameBoard.length; i++){
			var col;
			var line;
			if(!alreadyScannedPieces.includes(gameBoard[i][col][line])){
				if(line - 3 >= 0){
					//scan vertical haut
					if(    gameBoard[i][col][line]   == colorOne 
						&& gameBoard[i][col][line-1] == colorTwo 
						&& gameBoard[i][col][line-2] == colorTwo 
						&& gameBoard[i][col][line-3] == colorOne){
						if(this.player == 1)
						{
							this.nbOfClampPlayerOne++;
						}
						else{
							this.nbOfClampPlayerTwo++;
						}
						//////////////////////
						//TODO supprimer gameBoard[i][col][line-1] et gameBoard[i][col][line-2]
						//////////////////////
						alreadyScannedPieces.push(gameBoard[i][col][line-3]);
					}
				}
				if(col + 3 <= 18 || line - 3 >= 0){
					//scan diagonal haut droite
					if(    gameBoard[i][col][line]     == colorOne 
						&& gameBoard[i][col+1][line-1] == colorTwo 
						&& gameBoard[i][col+2][line-2] == colorTwo 
						&& gameBoard[i][col+3][line-3] == colorOne){
						if(this.player == 1)
						{
							this.nbOfClampPlayerOne++;
						}
						else{
							this.nbOfClampPlayerTwo++;
						}
						alreadyScannedPieces.push(gameBoard[i][col+2][line-3]);
					}
				}
				if(col + 3 <= 18){
					//scan horizontal droit
					if(    gameBoard[i][col][line]   == colorOne 
						&& gameBoard[i][col+1][line] == colorTwo 
						&& gameBoard[i][col+2][line] == colorTwo 
						&& gameBoard[i][col+3][line] == colorOne){
						if(this.player == 1)
						{
							this.nbOfClampPlayerOne++;
						}
						else{
							this.nbOfClampPlayerTwo++;
						}
						alreadyScannedPieces.push(gameBoard[i][col+2][line-3]);
					}
				}
				if(col + 3 <= 18 || line + 3 <= 18){
					//scan diagonal bas droit
					if(    gameBoard[i][col][line]     == colorOne 
						&& gameBoard[i][col+1][line+1] == colorTwo 
						&& gameBoard[i][col+2][line+2] == colorTwo 
						&& gameBoard[i][col+3][line+3] == colorOne){
						if(this.player == 1)
						{
							this.nbOfClampPlayerOne++;
						}
						else{
							this.nbOfClampPlayerTwo++;
						}
						alreadyScannedPieces.push(gameBoard[i][col+3][line+3]);
					}
				}
				if(line + 3 <= 18){
					//scan vertical bas
					if(    gameBoard[i][col][line]   == colorOne 
						&& gameBoard[i][col][line+1] == colorTwo 
						&& gameBoard[i][col][line+2] == colorTwo 
						&& gameBoard[i][col][line+3] == colorOne){
						if(this.player == 1)
						{
							this.nbOfClampPlayerOne++;
						}
						else{
							this.nbOfClampPlayerTwo++;
						}
						alreadyScannedPieces.push(gameBoard[i][col][line+3]);
					}
				}
				if(col - 3 >= 0 || line + 3 <= 18){
					//scan diagonal bas gauche
					if(    gameBoard[i][col][line]     == colorOne 
						&& gameBoard[i][col-1][line+1] == colorTwo 
						&& gameBoard[i][col-2][line+2] == colorTwo 
						&& gameBoard[i][col-3][line+3] == colorOne){
						if(this.player == 1)
						{
							this.nbOfClampPlayerOne++;
						}
						else{
							this.nbOfClampPlayerTwo++;
						}
						alreadyScannedPieces.push(gameBoard[i][col-3][line+3]);
					}
				}
				if(col - 3 >= 0){
					//scan hozizontal gauche
					if(    gameBoard[i][col][line]   == colorOne 
						&& gameBoard[i][col-1][line] == colorTwo 
						&& gameBoard[i][col-2][line] == colorTwo 
						&& gameBoard[i][col-3][line] == colorOne){
						if(this.player == 1)
						{
							this.nbOfClampPlayerOne++;
						}
						else{
							this.nbOfClampPlayerTwo++;
						}
						alreadyScannedPieces.push(gameBoard[i][col-3][line]);
					}
				}
				if(col - 3 >= 0 || line - 3 >= 0){
					//scan diagonal haut gauche
					if(    gameBoard[i][col][line]     == colorOne 
						&& gameBoard[i][col-1][line-1] == colorTwo 
						&& gameBoard[i][col-2][line-2] == colorTwo 
						&& gameBoard[i][col-3][line-3] == colorOne){
						if(this.player == 1)
						{
							this.nbOfClampPlayerOne++;
						}
						else{
							this.nbOfClampPlayerTwo++;
						}
						alreadyScannedPieces.push(gameBoard[i][col-3][line]);
					}
				}
			}
		}
	}
	checkFivePiecesAlignment(){
		var color = this.player == 1 ? "W" : "B";
		for(var i = 0; gameBoard.length; i++){
			var col;
			//choper la colone de gameBoard[i]
			var line;
			//choper la ligne de gameBoard[i]
			if(line - 4 >= 0){
				//scan vertical haut
				if(    gameBoard[i][col][line]   == color 
					&& gameBoard[i][col][line-1] == color 
					&& gameBoard[i][col][line-2] == color 
					&& gameBoard[i][col][line-3] == color
					&& gameBoard[i][col][line-4] == color){
					return true;
				}
			}
			if(col + 4 <= 18 || line - 4 >= 0){
				//scan diagonal haut droite
				if(    gameBoard[i][col][line]     == color 
					&& gameBoard[i][col+1][line-1] == color 
					&& gameBoard[i][col+2][line-2] == color 
					&& gameBoard[i][col+3][line-3] == color
					&& gameBoard[i][col+4][line-4] == color){
					return true;
				}
			}
			if(col + 4 <= 18){
				//scan horizontal droit
				if(    gameBoard[i][col][line]   == color 
					&& gameBoard[i][col+1][line] == color 
					&& gameBoard[i][col+2][line] == color 
					&& gameBoard[i][col+3][line] == color
					&& gameBoard[i][col+4][line] == color){
					return true;
				}
			}
			if(col + 4 <= 18 || line + 4 <= 18){
				//scan diagonal bas droit
				if(    gameBoard[i][col][line]     == color 
					&& gameBoard[i][col+1][line+1] == color 
					&& gameBoard[i][col+2][line+2] == color 
					&& gameBoard[i][col+3][line+3] == color
					&& gameBoard[i][col+4][line+4] == color){
					return true;
				}
			}
			if(line + 4 <= 18){
				//scan vertical bas
				if(    gameBoard[i][col][line]   == color 
					&& gameBoard[i][col][line+1] == color 
					&& gameBoard[i][col][line+2] == color 
					&& gameBoard[i][col][line+3] == color
					&& gameBoard[i][col][line+4] == color){
					return true;
				}
			}
			if(col - 4 >= 0 || line + 4 <= 18){
				//scan diagonal bas gauche
				if(    gameBoard[i][col][line]     == color 
					&& gameBoard[i][col-1][line+1] == color 
					&& gameBoard[i][col-2][line+2] == color 
					&& gameBoard[i][col-3][line+3] == color
					&& gameBoard[i][col-4][line+4] == color){
					return true;
				}
			}
			if(col - 4 >= 0){
				//scan hozizontal gauche
				if(    gameBoard[i][col][line]   == color 
					&& gameBoard[i][col-1][line] == color 
					&& gameBoard[i][col-2][line] == color 
					&& gameBoard[i][col-3][line] == color
					&& gameBoard[i][col-4][line] == color){
					return true;
				}
			}
			if(col - 4 >= 0 || line - 4 >= 0){
				//scan diagonal haut gauche
				if(    gameBoard[i][col][line]     == color 
					&& gameBoard[i][col-1][line-1] == color 
					&& gameBoard[i][col-2][line-2] == color 
					&& gameBoard[i][col-3][line-3] == color
					&& gameBoard[i][col-4][line-4] == color){
					return true;
				}
			}

		}
	}
	updateGameState(player, nbOfClampPlayerOne, nbOfClampPlayerTwo, round){
		this.gameState = [player, nbOfClampPlayerOne, nbOfClampPlayerTwo, round];
	} 
	returnError(){
		//retourner l'erreur au joueur
	}

}