import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class CategoriaService {

  categoria: any;

  constructor( public http: HttpClient ) {

   }

   mostrarSubCat( desde: number = 0 ) {

    const url = URL_SERVICIOS + '/subcategoria?desde=' + desde;
    return this.http.get( url );

   }


   mostrarCat( desde: number = 0 ) {

    const url = URL_SERVICIOS + '/categoria?desde=' + desde;
    return this.http.get( url );

   }



   crearSubCat( id: string, nombre: string ) {

    const subcategoria = { nombre: nombre, categoria: id };
    const url = URL_SERVICIOS + '/subcategoria';
    return this.http.post( url, subcategoria ).map((resp: any) => {

      // console.log (resp);
      return resp;

    });

   }

   crearCat( nombre: string ) {


    const nom = {nombre: nombre};
    console.log(nom);
    const url = URL_SERVICIOS + '/categoria';
    return this.http.post( url, nom ).map((resp: any) => {

      // console.log (resp);
      return resp;

    });

   }

   eliminarSubCat( id: string ) {

    const url = URL_SERVICIOS + '/subcategoria/' + id;
    return this.http.delete( url ).map((resp: any) => {

      console.log (resp);
      return resp;

    });

   }


   eliminarCat( id: string ) {

    const url = URL_SERVICIOS + '/categoria/' + id;
    return this.http.delete( url ).map((resp: any) => {

      console.log (resp);
      return resp;

    });

   }


   actualizarCat( nombre: string, id: string, idCat: string ) {


    const nom = {nombre: nombre, categoria: idCat};
    console.log(nom);
    const url = URL_SERVICIOS + '/categoria/' + id;
    return this.http.put( url, nom ).map((resp: any) => {

      console.log (resp);
      return true;

    });

   }

   actualizarSubCat( nombre: string, idCat: string, id: string ) {


    const nom = {nombre: nombre, categoria: idCat};
    // console.log(nom);
    const url = URL_SERVICIOS + '/subcategoria/' + id;
    return this.http.put( url, nom ).map((resp: any) => {

      console.log (resp);
      return resp;

    });

   }
}
