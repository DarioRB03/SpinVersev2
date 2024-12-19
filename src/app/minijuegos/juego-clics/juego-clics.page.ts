import { Component } from '@angular/core';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-juego-clics',
  templateUrl: './juego-clics.page.html',
  styleUrls: ['./juego-clics.page.scss']
})
export class JuegoClicsPage {
  clickCount: number = 0;
  timer: number = 10;
  gameStarted: boolean = false;
  intervalId: any;
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

  countClick() {
    if (this.timer > 0) {
      this.clickCount++;
    }
  }

  startGame() {
    this.clickCount = 0;
    this.timer = 10;
    this.gameStarted = true;

    this.intervalId = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        clearInterval(this.intervalId);
        this.gameStarted = false;
        this.calculateCoins();
      }
    }, 1000);
  }


  calculateCoins() {
    this.coinsEarned = Math.floor(this.clickCount / 2); 
    if (this.userId && this.coinsEarned > 0) {
      this.firestoreService.updateUserCoins(this.userId, this.coinsEarned).then(() => {
        console.log(`${this.coinsEarned} monedas añadidas al usuario.`);
      }).catch(error => {
        console.error('Error al añadir monedas:', error);
      });
    }
  }
}
