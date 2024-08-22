export class UsuarioDto {
    id: number;
    idPessoa: number;
    senha: string;

    constructor(id?: number, idPessoa?: number, senha?: string) {
        this.id = id || 0;
        this.idPessoa = idPessoa || 0;
        this.senha = senha || '';
    }
}