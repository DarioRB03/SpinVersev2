import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  minijuegos = [
    { nombre: 'Juego de Clics', icono: 'hand-left', descripcion: 'Haz clic lo más rápido posible.', ruta: 'juego-clics' },
    { nombre: 'Quiz', icono: 'help-circle', descripcion: 'Responde preguntas de conocimiento general.', ruta: 'quiz' },
    { nombre: 'Matemáticas Rápidas', icono: 'calculator', descripcion: 'Resuelve problemas matemáticos rápidamente.', ruta: 'math' },
    { nombre: 'Juego de Memoria', icono: 'albums', descripcion: 'Recuerda la secuencia de colores.', ruta: 'memory' },
    { nombre: 'Juego de Reflejos', icono: 'flash', descripcion: 'Pon a prueba tus reflejos tocando el objetivo.', ruta: 'tap' }
  ];


  constructor(private router: Router) {}

  ngOnInit() {
    console.log('Minijuegos page loaded');
  }

  openMinijuego(minijuego: any) {
    this.router.navigate([`/tabs/tab2/${minijuego.ruta}`]);
  }

}
