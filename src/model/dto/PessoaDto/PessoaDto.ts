export class PessoaDto {
    id: number;
    name: string;
    email: string;

    constructor(id?: number, name?: string, email?: string) {
        this.id = id || 0;
        this.name = name || '';
        this.email = email || '';
    }
}