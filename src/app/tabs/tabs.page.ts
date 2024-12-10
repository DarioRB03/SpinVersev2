import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage {
  constructor(private auth: AngularFireAuth, private router: Router) {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('Usuario autenticado en tabs:', user);
      } else {
        console.log('No hay usuario autenticado, redirigiendo al login...');
        this.router.navigate(['/login']);
      }
    });
  }
  
}
