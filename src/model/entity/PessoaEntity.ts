export class PessoaEntity {
    id: number;
    name: string;
    email: string;

    constructor(id?: number, name?: string, email?: string) {
        this.validatesInformation(name, email);
        this.id = id || 0;
        this.name = name || '';
        this.email = email || '';
    }
    private validatesInformation(name: any, email: any) {
        let error = '';
        if (typeof name !== 'string') {
            error += ("Informações incompletas ou incorretas. ");
        }
        if (typeof email !== 'string') {
            error += ("Informações incompletas ou incorretas. ");
        }

        if (error != '') {
            throw new Error(error);
        }
    }
}