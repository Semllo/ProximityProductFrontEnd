import { SubCategoria } from './subcategoria.model';


export class Producto {

    constructor(
        public nombre: string,
        public subcategoria?: SubCategoria,
        public precio?: number,
        public img?: string,
        public fecha?: string,
        public descripcion?: string,
        public notamedia?: number,
        public popularidad?: number,
        public _id?: string
    ) { }

}
