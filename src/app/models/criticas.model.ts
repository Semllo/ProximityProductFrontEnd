
export class Criticas {

    constructor(
        public nota: string,
        public _id: string,
        public producto: Array<{Producto}>,
        public nombre?: string,
        public descripcion?: string
    ) { }

}
