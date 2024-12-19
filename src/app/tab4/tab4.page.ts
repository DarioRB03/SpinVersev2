import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../core/services/firestore.service'; 
import { AngularFireAuth } from '@angular/fire/compat/auth';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  userId: string = ''; 
  nombre: string = ''; 
  email: string = ''; 
  spinsLeft: number = 0; 
  updateMessage: string = '';
  purchasedItems: any[] = []; // Artículos comprados

  constructor(
    private firestoreService: FirestoreService,
    private auth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.auth.currentUser.then((user) => {
      if (user) {
        this.userId = user.uid;
        this.loadUserProfile();
        this.loadPurchasedItems();
      }
    });
  }

  loadUserProfile() {
    this.firestoreService.getUserData(this.userId).subscribe((data: any) => {
      if (data) {
        this.nombre = data.username || 'Usuario Anónimo';
        this.email = data.email || '';
        this.spinsLeft = data.spins || 0;
      }
    });
  }

  loadPurchasedItems() {
    this.firestoreService.getUserData(this.userId).subscribe((data: any) => {
      this.purchasedItems = data?.purchasedItems || []; // Cargar artículos comprados
    });
  }

  // Actualiza los datos del usuario en Firestore
  updateProfile() {
    const updatedData = {
      username: this.nombre,
      email: this.email,
    };
    this.firestoreService.updateUserProfile(this.userId, updatedData).then(() => {
      this.updateMessage = 'Perfil actualizado correctamente';
      setTimeout(() => {
        this.updateMessage = '';
      }, 3000);
    });
  }

}
