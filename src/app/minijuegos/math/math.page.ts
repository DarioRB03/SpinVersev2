import { Component, OnInit } from '@angular/core';

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

  ngOnInit() {
    this.startGame(); 
  }

  startGame() {
    this.timeLeft = 60;
    this.score = 0;
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
      this.playerAnswer = null; 
      this.nextQuestion();
    } else {
      this.playerAnswer = null; 
    }
  }
}
