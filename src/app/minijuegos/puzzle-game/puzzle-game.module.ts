import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PuzzleGamePageRoutingModule } from './puzzle-game-routing.module';

import { PuzzleGamePage } from './puzzle-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PuzzleGamePageRoutingModule
  ],
  declarations: [PuzzleGamePage]
})
export class PuzzleGamePageModule {}
