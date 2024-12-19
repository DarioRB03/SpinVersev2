import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import firebase from 'firebase/compat/app'; // Importa Firebase


@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  createUser(userId: string, username: string, email: string) {
    const initialData = {
      username: username,
      email: email,
      spins: 3,
      coins: 1,
    };
    return this.firestore.collection('users').doc(userId).set(initialData);
  }
  

  getUserData(userId: string) {
    return this.firestore.collection('users').doc(userId).valueChanges();
  }

  updateUserSpins(userId: string, spinsLeft: number) {
    const userDocRef = this.firestore.collection('users').doc(userId);
  
    return userDocRef
      .get()
      .toPromise()
      .then((doc) => {
        if (doc && doc.exists) {
          console.log(`Actualizando tiradas restantes en Firestore: ${spinsLeft}`);
          return userDocRef.update({ spins: spinsLeft });
        } else {
          console.log(`Documento no existe. Creando con ${spinsLeft} tiradas.`);
          return userDocRef.set({ spins: spinsLeft });
        }
      })
      .catch((error) => {
        console.error('Error actualizando tiradas:', error);
      });
  }
  

  getStoreItems() {
    return this.firestore.collection('store').valueChanges(); // Obtener todos los artículos de la tienda
  }

  getRandomCoupon() {
    return this.firestore.collection('coupons').valueChanges().pipe(
      map((coupons: any[]) => {
        if (coupons && coupons.length > 0) {
          const randomIndex = Math.floor(Math.random() * coupons.length);
          return coupons[randomIndex]; // Retorna un cupón aleatorio
        } else {
          return null; // Si no hay cupones disponibles
        }
      })
    );
  }

  getUserEmailByUsername(username: string): Promise<string | null> {
    return this.firestore
      .collection('users', (ref) => ref.where('username', '==', username))
      .get()
      .toPromise()
      .then((querySnapshot) => {
        if (!querySnapshot || querySnapshot.empty) {
          console.error('No se encontró ningún usuario con ese nombre.');
          return null; // Nombre de usuario no encontrado
        }
        const userData = querySnapshot.docs[0].data() as any;
        return userData?.email || null; // Retorna el correo asociado
      })
      .catch((error) => {
        console.error('Error buscando el email por username:', error);
        return null;
      });
  }
  


  updateUserCoins(userId: string, coinsToAdd: number) {
    const userDocRef = this.firestore.collection('users').doc(userId);
  
    return userDocRef
      .get()
      .toPromise()
      .then((doc) => {
        if (doc && doc.exists) {
          const userData = doc.data() as { coins?: number }; // Especificar el tipo esperado
          const currentCoins = userData?.coins || 0;
          return userDocRef.update({ coins: currentCoins + coinsToAdd });
        } else {
          // Si no existe el documento, crearlo con las monedas iniciales
          return userDocRef.set({ coins: coinsToAdd });
        }
      });
  }
  

  updateUserProfile(userId: string, updatedData: { username: string; email: string }) {
    return this.firestore.collection('users').doc(userId).update(updatedData);
  }

  purchaseItem(userId: string, item: any, userCoins: number) {
    if (userCoins < item.price) {
      return Promise.reject('No tienes suficientes monedas');
    }

    return this.firestore.collection('users').doc(userId).update({
      coins: userCoins - item.price,
      purchasedItems: firebase.firestore.FieldValue.arrayUnion(item),
    });
  }

}
