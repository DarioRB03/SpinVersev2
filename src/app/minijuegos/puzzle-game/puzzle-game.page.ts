import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-puzzle-game',
  templateUrl: './puzzle-game.page.html',
  styleUrls: ['./puzzle-game.page.scss'],
})
export class PuzzleGamePage implements OnInit {

  pieces: any[] = []; // Piezas del rompecabezas
  shuffledPieces: any[] = []; // Piezas mezcladas
  timeLeft: number = 60; 
  gameOver: boolean = false; 
  winMessage: string = ''; 
  coinsEarned: number = 0; 
  userId: string | null = null;

  constructor(
    private firestoreService: FirestoreService,
    private auth: AngularFireAuth
  ) {
    this.auth.currentUser.then((user) => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  ngOnInit() {
    this.initializeGame();
  }

  // Inicializa el juego
  initializeGame() {
    this.pieces = Array.from({ length: 8 }, (_, i) => ({
      value: i + 1, // Valor de la pieza
      position: i, // Posición inicial
    }));
  
    // Agregar una pieza vacía
    this.pieces.push({ value: null, position: 8 });
  
    this.shuffledPieces = this.shuffleArray([...this.pieces]); // Mezclar las piezas
    this.timeLeft = 60; // Tiempo inicial
    this.gameOver = false; // Estado del juego
    this.winMessage = ''; // Mensaje de victoria o derrota
    this.coinsEarned = 0; 
    this.startTimer(); // Iniciar el temporizador
  }
  

  // Mezcla las piezas
  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Temporizador del juego
  startTimer() {
    const timer = setInterval(() => {
      this.timeLeft -= 1;
      if (this.timeLeft <= 0) {
        clearInterval(timer);
        this.endGame(false);
      }
    }, 1000);
  }

  // Mueve una pieza (lógica del juego)
  movePiece(index: number) {
    if (this.gameOver) return;
  
    const emptyIndex = this.shuffledPieces.findIndex((p) => p.value === null); // Buscar casilla vacía
  
    // Validar si el movimiento es válido
    const validMoves = [
      emptyIndex - 1, // Izquierda
      emptyIndex + 1, // Derecha
      emptyIndex - 3, // Arriba
      emptyIndex + 3, // Abajo
    ];
  
    if (validMoves.includes(index)) {
      // Intercambiar piezas
      [this.shuffledPieces[emptyIndex], this.shuffledPieces[index]] = [
        this.shuffledPieces[index],
        this.shuffledPieces[emptyIndex],
      ];
  
      // Verificar si el rompecabezas está resuelto
      if (this.isPuzzleSolved()) {
        this.endGame(true);
      }
    }
  }
  

  // Verifica si el rompecabezas está resuelto
  isPuzzleSolved() {
    return this.shuffledPieces.every(
      (piece, index) => piece.value === index + 1 || (piece.value === null && index === 8)
    );
  }

  // Cuenta las piezas correctamente colocadas
  countCorrectPieces() {
    return this.shuffledPieces.filter(
      (piece, index) =>
        piece.value === index + 1 || (piece.value === null && index === 8)
    ).length;
  }
  
  // Termina el juego
  endGame(isWin: boolean) {
    this.gameOver = true;

    const correctPieces = this.countCorrectPieces();
    const coins = correctPieces; // 1 moneda por cada pieza correctamente colocada
    this.coinsEarned = coins;

    if (isWin) {
      this.winMessage = '¡Felicidades! Has resuelto el rompecabezas.';
    } else {
      this.winMessage = 'Se acabó el tiempo.';
    }

    this.addCoins(coins); 
  }

  addCoins(coins: number) {
    if (this.userId) {
      this.firestoreService.updateUserCoins(this.userId, coins).then(() => {
        console.log(`${coins} monedas añadidas al usuario.`);
      }).catch(error => {
        console.error('Error al añadir monedas:', error);
      });
    }
  }

  // Reinicia el juego
  restartGame() {
    this.initializeGame();
  }


}