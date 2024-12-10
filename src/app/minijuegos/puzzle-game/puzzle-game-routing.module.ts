import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PuzzleGamePage } from './puzzle-game.page';

const routes: Routes = [
  {
    path: '',
    component: PuzzleGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PuzzleGamePageRoutingModule {}
