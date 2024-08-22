export class PessoaRequestsDto {
    name: string;
    email: string;

    constructor(id?: number, name?: string, email?: string) {
        this.name = name || '';
        this.email = email || '';
    }
}