// tslint:disable-next-line:quotemark
import { Producto } from "./producto.model";

export class Criticas {

    constructor(
        public nota: string,
        public _id: string,
        public producto: Producto,
        public nombre?: string,
        public descripcion?: string
    ) { }

}
