import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JuegoClicsPage } from './juego-clics.page';

const routes: Routes = [
  {
    path: '',
    component: JuegoClicsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JuegoClicsPageRoutingModule {}
