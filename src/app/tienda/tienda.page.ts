import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../core/services/firestore.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})
export class TiendaPage implements OnInit {
  storeItems: any[] = []; // Array para los artículos
  userCoins: number = 0; // Monedas actuales del usuario
  userId: string = ''; // ID del usuario autenticado

  constructor(
    private firestoreService: FirestoreService,
    private auth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.auth.currentUser.then((user) => {
      if (user) {
        this.userId = user.uid;
        this.loadUserCoins();
        this.loadStoreItems();
      }
    });
  }

  // Cargar las monedas actuales del usuario desde Firestore
  loadUserCoins() {
    this.firestoreService.getUserData(this.userId).subscribe((data: any) => {
      this.userCoins = data?.coins || 0;
      console.log('Monedas actuales:', this.userCoins);
    });
  }

  // Cargar los datos de los artículos de la tienda desde Firestore
  loadStoreItems() {
    this.firestoreService.getStoreItems().subscribe((items) => {
      this.storeItems = items;
      console.log('Artículos de la tienda:', this.storeItems);
    });
  }

  buyItem(item: any) {
    this.firestoreService
      .purchaseItem(this.userId, item, this.userCoins)
      .then(() => {
        alert(`Has comprado ${item.name} con éxito`);
      })
      .catch((err) => {
        alert(err);
      });
  }
}