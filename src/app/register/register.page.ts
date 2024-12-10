import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirestoreService } from '../core/services/firestore.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private firestoreService: FirestoreService
  ) {}

  async register() {
    try {
      // Crear usuario en Firebase Authentication
      const userCredential = await this.auth.createUserWithEmailAndPassword(
        this.email,
        this.password
      );

      // Obtener el UID del usuario creado
      const userId = userCredential.user?.uid;

      if (userId) {
        // Crear documento en Firestore
        await this.firestoreService.createUser(userId, this.username, this.email);

        console.log('Registro exitoso:', userId);
        this.router.navigate(['/login']); // Redirige al login después del registro
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      alert('Hubo un problema al registrarte. Inténtalo nuevamente.');
    }
  }
}
