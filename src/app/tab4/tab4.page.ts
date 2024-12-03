import { Component, OnInit } from '@angular/core';

// import { FirestoreService } from 'src/app/core/services/firestore.service'

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  nombre: string = 'Dario';
  email: string = 'usuario@example.com';
  spinsLeft: number = 3;
  updateMessage: string = '';

  constructor() { }

  ngOnInit() {
    console.log('Perfil page loaded');
  }

  // updateProfile() {
  //   this.firestoreService.updateUserProfile(this.nombre, this.email).then(() => {
  //     this.updateMessage = 'Perfil actualizado correctamente';
  //     setTimeout(() => {
  //       this.updateMessage = '';
  //     }, 3000); 
  //   });
  // }

}
