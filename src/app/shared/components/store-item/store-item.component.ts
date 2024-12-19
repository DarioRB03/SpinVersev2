import { Component, Input } from '@angular/core';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-store-item',
  templateUrl: './store-item.component.html',
  styleUrls: ['./store-item.component.scss'],
})
export class StoreItemComponent {
  @Input() item: any; 
  userCoins: number = 0; 
  userId: string = '';  

  constructor(
    private firestoreService: FirestoreService,
    private auth: AngularFireAuth
  ) {}


  ngOnInit() {
    this.auth.currentUser.then((user) => {
      if (user) {
        this.userId = user.uid; // Obtener el ID del usuario
        this.firestoreService.getUserData(this.userId).subscribe((data: any) => {
          this.userCoins = data?.coins || 0; // Obtener las monedas actuales
        });
      }
    });
  }

  buyItem() {
    if (this.userCoins >= this.item.price) {
      // Si el usuario tiene suficientes monedas
      this.firestoreService
        .purchaseItem(this.userId, this.item, this.userCoins)
        .then(() => {
          alert(`¡Has comprado ${this.item.name} con éxito!`);
        })
        .catch((error) => {
          console.error('Error al comprar el artículo:', error);
        });
    } else {
      alert('No tienes suficientes monedas para comprar este artículo.');
    }
  }
}
