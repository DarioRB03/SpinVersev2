import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
  },
  {
    path: 'juego-clics',
    loadChildren: () => import('../minijuegos/juego-clics/juego-clics.module').then(m => m.JuegoClicsPageModule)
  },
  {
    path: 'quiz',
    loadChildren: () => import('../minijuegos/quiz/quiz.module').then(m => m.QuizPageModule)
  },
  {
    path: 'math',
    loadChildren: () => import('../minijuegos/math/math.module').then(m => m.MathPageModule)
  },
  {
    path: 'memory',
    loadChildren: () => import('../minijuegos/memory/memory.module').then(m => m.MemoryPageModule)
  },
  {
    path: 'tap',
    loadChildren: () => import('../minijuegos/tap/tap.module').then(m => m.TapPageModule)
  },
  {
    path: 'puzzle-game',
    loadChildren: () => import('../minijuegos/puzzle-game/puzzle-game.module').then( m => m.PuzzleGamePageModule)
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
