import { Component } from '@angular/core';

@Component({
  selector: 'app-juego-clics',
  templateUrl: './juego-clics.page.html',
  styleUrls: ['./juego-clics.page.scss']
})
export class JuegoClicsPage {
  clickCount: number = 0;
  timer: number = 10;
  intervalId: any;

  countClick() {
    if (this.timer > 0) {
      this.clickCount++;
    }
  }

  startGame() {
    this.clickCount = 0;
    this.timer = 10;

    this.intervalId = setInterval(() => {
      this.timer--;
      if (this.timer === 0) {
        clearInterval(this.intervalId);
        alert(`Juego terminado! Total de clics: ${this.clickCount}`);
      }
    }, 1000);
  }
}
