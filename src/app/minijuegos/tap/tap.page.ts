import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-tap',
  templateUrl: './tap.page.html',
  styleUrls: ['./tap.page.scss']
})
export class TapPage implements OnInit, OnDestroy {
  @ViewChild('tapContainer', { static: false }) tapContainer!: ElementRef;

  gameStarted: boolean = false;
  gameOver: boolean = false;
  score: number = 0;
  showTarget: boolean = false;
  targetPosition = { x: 0, y: 0 };
  timeoutId: any;
  countdownInterval: any;

  timeLeft: number = 30;
  targetDelay: number = 1200;
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

  ngOnInit() {}

  ngOnDestroy() {
    clearTimeout(this.timeoutId);
    clearInterval(this.countdownInterval);
  }

  startGame() {
    this.gameStarted = true;
    this.gameOver = false;
    this.score = 0;
    this.coinsEarned = 0;
    this.timeLeft = 30;
    this.targetDelay = 1200;

    this.countdownInterval = setInterval(() => {
      this.timeLeft -= 1;
      if (this.timeLeft <= 0) {
        this.endGame();
      }
    }, 1000);

    this.nextTarget();
  }

  nextTarget() {
    this.showTarget = false;

    this.timeoutId = setTimeout(() => {
      this.positionTarget();
      this.showTarget = true;

      setTimeout(() => {
        if (this.showTarget) {
          this.showTarget = false;
          this.nextTarget();
        }
      }, this.targetDelay);

      if (this.targetDelay > 300) {
        this.targetDelay -= 50;
      }
    }, this.targetDelay);
  }

  positionTarget() {
    if (this.tapContainer && this.tapContainer.nativeElement) {
      const container = this.tapContainer.nativeElement.getBoundingClientRect();
      const maxX = container.width - 50; 
      const maxY = container.height - 50;

      this.targetPosition.x = Math.floor(Math.random() * maxX);
      this.targetPosition.y = Math.floor(Math.random() * maxY);
    }
  }

  hitTarget() {
    if (this.showTarget) {
      this.score += 1;
      this.addCoins(1);
      this.showTarget = false;
      this.nextTarget();
    }
  }

  endGame() {
    this.gameStarted = false;
    this.gameOver = true;
    this.showTarget = false;
    clearTimeout(this.timeoutId);
    clearInterval(this.countdownInterval);
  }

  resetGame() {
    this.gameOver = false;
    this.startGame();
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
