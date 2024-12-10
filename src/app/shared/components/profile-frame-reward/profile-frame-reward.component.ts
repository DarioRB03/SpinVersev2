import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-profile-frame-reward',
  templateUrl: './profile-frame-reward.component.html',
  styleUrls: ['./profile-frame-reward.component.scss'],
})
export class ProfileFrameRewardComponent {
  @Input() frameImage: string = ''; // Imagen del marco ganado
  @Output() close = new EventEmitter<void>(); // Evento para cerrar el componente

  closeProfileFrameReward() {
    this.close.emit(); // Notificar al componente padre que se cierre
  }
}
