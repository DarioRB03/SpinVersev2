import { Component } from '@angular/core';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.page.html',
  styleUrls: ['./memory.page.scss']
})
export class MemoryPage {
  colors: string[] = ['red', 'blue', 'green', 'yellow'];
  sequence: string[] = [];
  playerSequence: string[] = [];
  isShowingSequence: boolean = false;
  gameOver: boolean = false;
  score: number = 0;
  message: string = '';

  startGame() {
    this.score = 0;
    this.sequence = [];
    this.playerSequence = [];
    this.gameOver = false;
    this.message = 'Observa la secuencia...';
    this.nextRound();
  }

  nextRound() {
    this.playerSequence = [];
    this.sequence.push(this.getRandomColor());
    this.isShowingSequence = true;
    this.showSequence().then(() => {
      this.isShowingSequence = false;
      this.message = 'Tu turno: toca los colores en el orden correcto';
    });
  }

  getRandomColor() {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  async showSequence() {
    for (const color of this.sequence) {
      await this.highlightColor(color);
    }
  }

  highlightColor(color: string) {
    return new Promise<void>(resolve => {
      const index = this.colors.indexOf(color);
      const button = document.querySelectorAll('button')[index];
      if (button) {
        button.classList.add('highlight');
        setTimeout(() => {
          button.classList.remove('highlight');
          setTimeout(() => resolve(), 300);
        }, 700);
      }
    });
  }

  onColorClick(color: string) {
    if (this.isShowingSequence || this.gameOver) return;

    this.playerSequence.push(color);
    const currentIndex = this.playerSequence.length - 1;

    if (this.playerSequence[currentIndex] !== this.sequence[currentIndex]) {
      this.gameOver = true;
      this.message = '¡Juego terminado! Fallaste la secuencia';
      return;
    }

    if (this.playerSequence.length === this.sequence.length) {
      this.score++;
      this.message = `¡Correcto! Puntuación: ${this.score}`;
      setTimeout(() => this.nextRound(), 1000);
    }
  }
}
