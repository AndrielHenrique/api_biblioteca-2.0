export class EmprestimoRequestsDto {
    idLivro: number;
    usuarioID: number;
    dataEmprestimo: string;
    dataDevolucao: string;

    constructor(id?: number, idLivro?: number, usuarioID?: number, dataEmprestimo?: string, dataDevolucao?: string) {
        this.idLivro = idLivro || 0;
        this.usuarioID = usuarioID || 0;
        this.dataEmprestimo = dataEmprestimo || '';
        this.dataDevolucao = dataDevolucao || '';
    }
}