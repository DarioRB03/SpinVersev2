import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TapPage } from './tap.page';

const routes: Routes = [
  {
    path: '',
    component: TapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TapPageRoutingModule {}
