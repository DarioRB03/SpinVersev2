import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirestoreService } from '../core/services/firestore.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username: string = '';
  password: string = '';

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private firestoreService: FirestoreService
  ) {}

  async login() {
    try {
      console.log('Buscando email para el username:', this.username);
  
      // Buscar el email asociado al username
      const email = await this.firestoreService.getUserEmailByUsername(this.username);
  
      if (!email) {
        alert('Nombre de usuario no encontrado.');
        console.error('El nombre de usuario no existe en Firestore.');
        return;
      }
  
      console.log('Email encontrado:', email);
  
      // Iniciar sesión con el correo encontrado
      const userCredential = await this.auth.signInWithEmailAndPassword(email, this.password);
      const userId = userCredential.user?.uid;
  
      if (userId) {
        console.log('Inicio de sesión exitoso:', userId);
        this.router.navigate(['/tabs']); // Redirige a la página principal
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión: ' + (error as any).message);
    }
  }
  
}
