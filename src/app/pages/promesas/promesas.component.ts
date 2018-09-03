import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    // tslint:disable-next-line:prefer-const
    let promesa = new Promise((resolve, reject) => {

      let contador = 0;
      const intervalo = setInterval (() => {

        contador += 1;
        console.log(contador);
        if ( contador === 3) {
          reject();
          clearInterval(intervalo);
        }

      }, 1000);

    });



    promesa
    .then(
      () => console.log('Termino'))
      .catch( error =>  console.error('Error en la promesa', error));



   }

  ngOnInit() {
  }

}
