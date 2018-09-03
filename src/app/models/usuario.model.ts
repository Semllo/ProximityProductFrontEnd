
export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string,
        public role: string = 'USER_ROLE',
        public google?: boolean,
        public _id?: string
    ) { }

}
