import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fortune-cookie',
  templateUrl: './fortune-cookie.component.html',
  styleUrls: ['./fortune-cookie.component.scss'],
})
export class FortuneCookieComponent {
  @Input() message: string = '';
  @Output() close = new EventEmitter<void>();

  // Función para cerrar la galletita
  closeCookie() {
    this.close.emit();
  }
}
