import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  // Obtener las tiradas restantes del usuario
  getUserSpins(userId: string): Observable<number> {
    return this.firestore
      .collection('users')
      .doc(userId)
      .valueChanges() as Observable<number>;
  }

  saveReward(userId: string, reward: { name: string; icon: string }) {
    return this.firestore.collection('users').doc(userId).collection('rewards').add(reward);
  }

  updateUserSpins(userId: string, spins: number) {
    return this.firestore.collection('users').doc(userId).update({ spins });
  }


  getUser(userId: string): Observable<any> {
    return this.firestore.collection('users').doc(userId).valueChanges();
  }
  
  updateUserProfile(nombre: string, email: string) {
    const userId = 'user123'; 
    return this.firestore.collection('users').doc(userId).update({ nombre, email });
  }
}
