import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JuegoClicsPageRoutingModule } from './juego-clics-routing.module';

import { JuegoClicsPage } from './juego-clics.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JuegoClicsPageRoutingModule
  ],
  declarations: [JuegoClicsPage]
})
export class JuegoClicsPageModule {}
