import { Categoria } from './categoria.model';

export class SubCategoria {

    constructor(
        public nombre: string,
        public _id: string,
        public categoria?: Categoria,
        public __v?: number
    ) { }
}
