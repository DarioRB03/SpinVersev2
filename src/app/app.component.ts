import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private auth: AngularFireAuth) {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('Usuario autenticado:', user);
        // Aquí estaba la redirección automática a los tabs
        // Puedes comentarlo o eliminarlo
        // this.router.navigate(['/tabs']); 
      } else {
        console.log('No hay usuario autenticado');
      }
    });
  }
}
