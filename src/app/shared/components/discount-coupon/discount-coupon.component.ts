import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FirestoreService } from 'src/app/core/services/firestore.service';

@Component({
  selector: 'app-discount-coupon',
  templateUrl: './discount-coupon.component.html',
  styleUrls: ['./discount-coupon.component.scss'],
})
export class DiscountCouponComponent implements OnInit {
  coupon: any = null; // Cupón aleatorio
  @Output() close = new EventEmitter<void>(); // Evento para cerrar el componente

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.loadRandomCoupon(); // Cargar un cupón aleatorio al iniciar
  }

  // Cargar un cupón aleatorio
  loadRandomCoupon() {
    this.firestoreService.getRandomCoupon().subscribe(
      (coupon) => {
        if (coupon) {
          console.log('Cupón aleatorio cargado:', coupon);
          this.coupon = coupon; // Asignar el cupón aleatorio
        } else {
          console.warn('No hay cupones disponibles.');
          this.coupon = null; // No hay cupones
        }
      },
      (error) => {
        console.error('Error al cargar el cupón:', error);
        this.coupon = null; // Manejar el error
      }
    );
  }

  // Cerrar el componente
  closeCoupon() {
    this.close.emit(); // Emitir el evento para cerrar el componente
  }
}
