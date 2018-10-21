import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/service.index';
import { Producto } from '../../models/producto.model';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition, query, stagger} from '@angular/animations';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
      trigger('pronuevos', [
        transition('* => *', [
          query(':leave', [
            stagger(
              100, [
                animate('0s ease-in-out', style({
                  transform: 'scale(0.8)'
                }))
              ]
            )
          ], {optional: true}),
          query(':enter', [
            style({
              transform: 'scale(0.05)',
            }),
            stagger(100, [
              animate('0.6s 0.9s ease-in-out', style({
                transform: 'scale(1)',
              }))
            ])
          ], {optional: true})
        ]),
      ]),

      trigger('propopulares', [
        transition('* => *', [
          query(':leave', [
            stagger(
              100, [
                animate('0s ease-in-out', style({
                  transform: 'scale(0.2)'
                }))
              ]
            )
          ], {optional: true}),
          query(':enter', [
            style({
              transform: 'scale(0.05)',
            }),
            stagger(100, [
              animate('0.5s 0.7s ease-in-out', style({
                transform: 'scale(1)',
              }))
            ])
          ], {optional: true})
        ]),
      ]),

      trigger('protop', [
        transition('* => *', [
          query(':leave', [
            stagger(
              100, [
                animate('0s ease-in-out', style({
                  transform: 'scale(0.2)'
                }))
              ]
            )
          ], {optional: true}),
          query(':enter', [
            style({
              transform: 'scale(0.05)',
            }),
            stagger(100, [
              animate('0.5s 0.7s ease-in-out', style({
                transform: 'scale(1)',
              }))
            ])
          ], {optional: true})
        ]),
      ]),
  ]
})
export class DashboardComponent implements OnInit {


  productos = [];
  productospop = [];
  productostop = [];
  mostrar = 12;

  constructor( public _usuarioService: ProductoService,
    public router: Router ) {

    this._usuarioService.cargarProductosNuevos().subscribe ( (resp: any) => {
      // console.log(resp);
      for ( let i = 0; i < resp.length; i++ ) {

        // console.log(resp[i]);
        if ( i < this.mostrar ) {
          this.productos[i] = resp[i];
        // console.log(this.productos[i]);
          this.productos[i].notamedia = Math.round(this.productos[i].notamedia * 10) / 10;
        } else { return; }
      }
    });

    this._usuarioService.cargarProductosPop().subscribe ( (resp: any) => {

      console.log(resp);
      for ( let i = 0; i < resp.productos.length; i++ ) {
        if ( i < this.mostrar ) {
          this.productospop[i] = resp.productos[i];
        // console.log(this.productos[i]);
        this.productospop[i].notamedia = Math.round(this.productospop[i].notamedia * 10) / 10;
        } else { return; }
      }

    });

    this._usuarioService.cargarProductosTop().subscribe ( (resp: any) => {

      for ( let i = 0; i < resp.productos.length; i++ ) {
        if ( i < this.mostrar ) {
          this.productostop[i] = resp.productos[i];
        // console.log(this.productos[i]);
        this.productostop[i].notamedia = Math.round(this.productostop[i].notamedia * 10) / 10;
        } else { return; }
      }

    });


  }

  ngOnInit() {
  }

  mostrarProductos() {
    this._usuarioService.cargarProductos().subscribe ( (resp: any) => {

      // console.log(resp);

    });
  }


  getColor( producto: any ) {
     // console.log(producto.notamedia * 10);
     // tslint:disable-next-line:triple-equals

     if (  isNaN(producto.notamedia) ) {
      return '0%';
     }
    // console.log((producto.notamedia * 10) + '%');
    return (producto.notamedia * 10) + '%';
  }

  navegarProducto ( id: any ) {
    // console.log(id);
     this.router.navigate(['/productoUser', id]);
  }
}
