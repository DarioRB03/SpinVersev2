import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MathPage } from './math.page';

const routes: Routes = [
  {
    path: '',
    component: MathPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MathPageRoutingModule {}
