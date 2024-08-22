import { stringParaData, verificaFormatoData } from "../../util/DataUtil";

export class EmprestimoEntity {
    id: number;
    idLivro: number;
    usuarioID: number;
    dataEmprestimo: Date;
    dataDevolucao: Date;

    constructor(id?: number, idLivro?: number, usuarioID?: number, dataEmprestimo?: string, dataDevolucao?: string) {
        this.validatesInformation(idLivro, usuarioID, dataEmprestimo, dataDevolucao);
        this.id = id || 0;
        this.idLivro = idLivro || 0;
        this.usuarioID = usuarioID || 0;
        this.dataEmprestimo = stringParaData(dataEmprestimo || '');
        this.dataDevolucao = stringParaData(dataDevolucao || '');
    }

    private validatesInformation(idLivro: any, usuarioID: any, dataEmprestimo: any, dataDevolucao: any) {
        let error = '';
        if (typeof idLivro !== 'number' || typeof usuarioID !== 'number' || typeof dataEmprestimo !== 'string' || typeof dataDevolucao !== 'string') {
            error += ("IdLivro Informações incompletas ou incorretas. ");
        }

        if (!verificaFormatoData(dataEmprestimo)) {
            error += ("A data deve possuir o formato: dd/MM/yyyy");
        }
        if (!verificaFormatoData(dataDevolucao)) {
            error += ("A data deve possuir o formato: dd/MM/yyyy");
        }

        if (error != '') {
            throw new Error(error);
        }
    }
}