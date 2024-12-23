import { Component } from '@angular/core';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-memory',
  templateUrl: './memory.page.html',
  styleUrls: ['./memory.page.scss']
})
export class MemoryPage {
  colors: string[] = ['red', 'blue', 'green', 'yellow'];
  sequence: string[] = [];
  playerSequence: string[] = [];
  currentHighlight: string | null = null; // Nueva propiedad para resaltar el color actual
  isShowingSequence: boolean = false;
  gameOver: boolean = false;
  score: number = 0;
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

  startGame() {
    this.score = 0;
    this.coinsEarned = 0;
    this.sequence = [];
    this.playerSequence = [];
    this.gameOver = false;
    this.currentHighlight = null;
    this.nextRound();
  }

  nextRound() {
    this.playerSequence = [];
    this.sequence.push(this.getRandomColor());
    this.isShowingSequence = true;
    this.showSequence().then(() => {
      this.isShowingSequence = false;
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
    return new Promise<void>((resolve) => {
      this.currentHighlight = color; // Resaltar el color actual
      setTimeout(() => {
        this.currentHighlight = null; // Quitar el resaltado
        setTimeout(() => resolve(), 300);
      }, 700);
    });
  }

  onColorClick(color: string) {
    if (this.isShowingSequence || this.gameOver) return;

    this.playerSequence.push(color);
    const currentIndex = this.playerSequence.length - 1;

    if (this.playerSequence[currentIndex] !== this.sequence[currentIndex]) {
      this.gameOver = true;
      return;
    }

    if (this.playerSequence.length === this.sequence.length) {
      this.score++;
      this.addCoins(1);
      setTimeout(() => this.nextRound(), 1000);
    }
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
