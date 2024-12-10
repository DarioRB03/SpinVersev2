import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-coin-reward',
  templateUrl: './coin-reward.component.html',
  styleUrls: ['./coin-reward.component.scss'],
})
export class CoinRewardComponent {
  @Input() coinsAwarded: number = 0; // Monedas ganadas
  @Output() close = new EventEmitter<void>(); // Notifica al padre cuando se cierra

  closeReward() {
    this.close.emit(); // Emitir el evento de cierre
  }
}
