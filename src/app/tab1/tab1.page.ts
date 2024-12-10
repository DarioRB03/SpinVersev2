import { Component } from '@angular/core';
import { FirestoreService } from '../core/services/firestore.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page {
  userId: string = '';
  spinsLeft: number = 0;
  isSpinning: boolean = false;
  currentIcon: string = 'help-circle'; // Icono mostrado actualmente en la ruleta
  rewardText: string = ''; // Mensaje para la galletita de la suerte
  showFortuneCookie: boolean = false; // Controla si se muestra la galletita
  intervalId: any;
  showExtraSpin: boolean = false;
  rewardCoins: number = 0; 
  showCoinReward: boolean = false; 
  rewardFrameImage: string = ''; // Imagen del marco ganado
  showProfileFrameReward: boolean = false;
  showCouponReward: boolean = false; 

  // Recompensas de la ruleta
  recompensas = [
    { nombre: 'Monedas', icono: 'cash-outline', cantidad: 50 },
    { nombre: 'Cupones de Descuento', icono: 'pricetag-outline', cantidad: 0 },
    { nombre: 'Marcos para Perfil', icono: 'person-circle-outline', cantidad: 0 },
    { nombre: 'Galletita de la Suerte', icono: 'star-outline', cantidad: 0 },
    { nombre: 'Tirada Extra', icono: 'refresh-outline', cantidad: 0 },
  ];

  // Mensajes para la galletita de la suerte
  fortuneMessages = [
    '¡Hoy es tu día de suerte!',
    'La persistencia vence a la resistencia.',
    'Una gran oportunidad se aproxima.',
    'Sigue jugando, la fortuna te sonríe.',
    'Confía en el proceso, el éxito llegará.',
  ];

  constructor(
    private firestoreService: FirestoreService,
    private auth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.auth.currentUser.then((user) => {
      if (user) {
        this.userId = user.uid;
        this.loadUserSpins();
      }
    });
  }

  // Carga las tiradas restantes desde Firebase
  loadUserSpins() {
    this.firestoreService.getUserData(this.userId).subscribe((data: any) => {
      this.spinsLeft = data?.spins || 0;
      console.log(`Tiradas restantes cargadas: ${this.spinsLeft}`);
    });
  }

  // Función para girar la ruleta
  async girarRuleta() {
    if (this.isSpinning || this.spinsLeft <= 0) return; // Bloquear si ya está girando o no hay tiradas
  
    this.isSpinning = true; // Activa el estado de giro
    this.currentIcon = 'help-circle';
  
    // Animación inicial
    this.intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * this.recompensas.length);
      this.currentIcon = this.recompensas[randomIndex].icono;
    }, 100);
  
    setTimeout(async () => {
      clearInterval(this.intervalId); // Detiene la animación
  
      // Determinar la recompensa final
      const finalIndex = Math.floor(Math.random() * this.recompensas.length);
      const recompensaFinal = this.recompensas[finalIndex];
  
      this.currentIcon = recompensaFinal.icono;
  
      // Manejar recompensas específicas
      if (recompensaFinal.nombre === 'Galletita de la Suerte') {
        const randomMessageIndex = Math.floor(Math.random() * this.fortuneMessages.length);
        this.rewardText = this.fortuneMessages[randomMessageIndex];
        this.spinsLeft -= 1;
        this.showFortuneCookie = true; // Mostrar componente de la galletita
      } else if (recompensaFinal.nombre === 'Tirada Extra') {
        this.spinsLeft += 1; // Sumar la tirada extra
        this.showExtraSpin = true; // Mostrar componente ExtraSpin
      } else if (recompensaFinal.nombre === 'Monedas') {
        this.rewardCoins = recompensaFinal.cantidad || 0; // Monedas ganadas
        this.spinsLeft -= 1;
        this.showCoinReward = true; // Mostrar el componente CoinReward
      } else if (recompensaFinal.nombre === 'Marcos para Perfil') {
        this.rewardFrameImage = 'https://via.placeholder.com/100x100?text=Marco';
        this.spinsLeft -= 1;
        this.showProfileFrameReward = true; // Mostrar el componente
      } else if (recompensaFinal.nombre === 'Cupones de Descuento') {
        this.spinsLeft -= 1;
        this.showCouponReward = true; // Mostrar componente de cupones
      }
      
      else {
        this.spinsLeft -= 1; // Restar una tirada si no es tirada extra
      }
  
      // Guardar cambios en Firestore
      await this.firestoreService.updateUserSpins(this.userId, this.spinsLeft);
      console.log(`Tiradas restantes actualizadas: ${this.spinsLeft}`);
      this.isSpinning = false;
    }, 3000);
  }
  
  // Función para cerrar la recompensa de monedas
  closeCoinReward() {
    this.showCoinReward = false;
  }
  
  // Función para cerrar la galletita
  closeFortuneCookie() {
    this.showFortuneCookie = false;
  }

  // Función para cerrar la tirada extra
  closeExtraSpin() {
    this.showExtraSpin = false;
  }

  // Función para cerrar la recompensa de marcos
  closeProfileFrameReward() {
    this.showProfileFrameReward = false;
  }

  closeCouponReward() {
    this.showCouponReward = false; 
  }

  // Función para desactivar la ruleta cuando no hay tiradas
  isRouletteDisabled(): boolean {
    return this.spinsLeft <= 0; // Bloquea solo si no hay tiradas
  }
}
