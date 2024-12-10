import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-extra-spin',
  templateUrl: './extra-spin.component.html',
  styleUrls: ['./extra-spin.component.scss'],
})
export class ExtraSpinComponent {
  @Output() close = new EventEmitter<void>();
  

  closeExtraSpin() {
    this.close.emit(); // Notificar al componente padre que se cierre
  }
}
