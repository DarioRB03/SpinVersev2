import { Component } from '@angular/core';
import { FirestoreService } from '../core/services/firestore.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  isSpinning: boolean = false;
  currentIcon: string = 'help-circle';
  rewardIcon: string = 'help-circle';
  rewardName: string = '';
  showRewardModal: boolean = false;
  spinsLeft: number = 3;
  userId: string = 'user123';
  intervalId: any;

  recompensas = [
    { nombre: 'Marcos de Perfil', icono: 'person-circle' },
    { nombre: 'Cupones de Descuento', icono: 'pricetag' },
    { nombre: 'Galletita de la Suerte', icono: 'star' },
    { nombre: 'Tirada Extra', icono: 'refresh' }
  ];


  constructor(private firestoreService: FirestoreService) {}

  

  ngOnInit() {
    console.log('Ruleta page loaded');
    this.firestoreService.getUserSpins(this.userId).subscribe(spins => {
      this.spinsLeft = spins || 3;
    });
  }

  async girarRuleta() {
    if (this.isSpinning || this.spinsLeft <= 0) return;

    this.isSpinning = true;
    this.currentIcon = 'help-circle';

    this.intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * this.recompensas.length);
      this.currentIcon = this.recompensas[randomIndex].icono;
    }, 100);

    setTimeout(() => {
      clearInterval(this.intervalId);
      const finalIndex = Math.floor(Math.random() * this.recompensas.length);
      const recompensaFinal = this.recompensas[finalIndex];
      this.currentIcon = recompensaFinal.icono;

      this.rewardIcon = recompensaFinal.icono;
      this.rewardName = recompensaFinal.nombre;
      this.showRewardModal = true; 
      this.isSpinning = false;

      this.firestoreService.saveReward(this.userId, { name: recompensaFinal.nombre, icon: recompensaFinal.icono });

      if (recompensaFinal.nombre !== 'Tirada Extra') {
        this.spinsLeft -= 1;
      }
      this.firestoreService.updateUserSpins(this.userId, this.spinsLeft);
    }, 3000);
  }

  closeRewardModal() {
    this.showRewardModal = false;
  }

}
