import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-math',
  templateUrl: './math.page.html',
  styleUrls: ['./math.page.scss']
})
export class MathPage implements OnInit {
  timeLeft: number = 60;
  score: number = 0;
  currentQuestion: string = '';
  playerAnswer: number | null = null;
  gameStarted: boolean = false;
  gameOver: boolean = false;
  correctAnswer: number = 0;
  timer: any;
  coinsEarned: number = 0;
  userId: string | null = null;

  constructor(
    private firestoreService: FirestoreService,
    private auth: AngularFireAuth
  ) {
    this.auth.currentUser.then(user => {
      if (user) {
        this.userId = user.uid;
      }
    });
  }

  ngOnInit() {
    this.startGame();
  }

  startGame() {
    this.timeLeft = 60;
    this.score = 0;
    this.coinsEarned = 0;
    this.gameStarted = true;
    this.gameOver = false;
    this.nextQuestion();

    this.timer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        clearInterval(this.timer);
        this.gameOver = true;
        this.gameStarted = false;
      }
    }, 1000);
  }

  nextQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operator = ['+', '-', '*'][Math.floor(Math.random() * 3)];
    this.currentQuestion = `${num1} ${operator} ${num2}`;

    switch (operator) {
      case '+':
        this.correctAnswer = num1 + num2;
        break;
      case '-':
        this.correctAnswer = num1 - num2;
        break;
      case '*':
        this.correctAnswer = num1 * num2;
        break;
    }
  }

  checkAnswer() {
    if (this.playerAnswer === this.correctAnswer) {
      this.score++;
      this.addCoins(1);
    }
    // Reinicia el input y pasa a la siguiente pregunta, sin importar si es correcto o no
    this.playerAnswer = null;
    this.nextQuestion();
  }

  addCoins(coins: number) {
    if (this.userId) {
      this.firestoreService.updateUserCoins(this.userId, coins).then(() => {
        this.coinsEarned += coins; 
        console.log(`${coins} monedas añadidas al usuario.`);
      }).catch(error => {
        console.error('Error al añadir monedas:', error);
      });
    }
  }
}
