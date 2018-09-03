import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { element } from 'protractor';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  // tslint:disable-next-line:no-input-rename
  @Input('nombre') leyenda = 'Leyenda';
  @Input() progreso = 50;

  // tslint:disable-next-line:no-output-rename
  @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter;

  constructor() {

    // console.log('Progreso:' + this.progreso);
    // console.log('Leyenda:' + this.leyenda);

   }

  ngOnInit() {
  }

  onChanges( newValue: number) {

    // tslint:disable-next-line:prefer-const
    // let elementHTML: any = document.getElementsByName('progreso')[0];

    if ( newValue >= 100 ) {
      this.progreso = 100;
    } else if ( newValue <= 0 ) {
      this.progreso = 0;
    } else {  this.progreso = newValue; }


    // elementHTML.value = Number ( this.progreso );

    this.txtProgress.nativeElement.value = this.progreso;

    this.cambioValor.emit( this.progreso );

    this.txtProgress.nativeElement.focus();

  }

  cambiarValor(a: number) {

     if (this.progreso >= 100 && a > 0 ) {
       this.progreso = 100;
       return;
     } else if ( this.progreso <= 0 && a < 0) {
      this.progreso = 0;
       return;
     }

    this.progreso += a;

    this.cambioValor.emit( this.progreso );

  }

}
