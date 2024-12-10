import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-store-item',
  templateUrl: './store-item.component.html',
  styleUrls: ['./store-item.component.scss'],
})
export class StoreItemComponent {
  @Input() item: any; // Recibirá los datos del artículo

  buyItem() {
    console.log(`Compraste el artículo: ${this.item.name}`);
    // Aquí puedes implementar la lógica para manejar la compra
  }
}
