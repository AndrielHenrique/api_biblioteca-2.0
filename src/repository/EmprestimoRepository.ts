import { executarComandoSQL } from "../database/mysql";
import { EmprestimoEntity } from "../model/entity/EmprestimoEntity";
import { LivroEntity } from "../model/entity/LivroEntity";
import { UsuarioEntity } from "../model/entity/UsuarioEntity";

export class EmprestimoRepository {

    private static instance: EmprestimoRepository;

    public static getInstance(): EmprestimoRepository {
        if (!this.instance) {
            this.instance = new EmprestimoRepository();
        }
        return this.instance;
    }

    constructor() {
        this.createTable();
    }

    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS estoque2.Emprestimo (
            id INT AUTO_INCREMENT PRIMARY KEY,
            idLivro INT NOT NULL,
            usuarioID INT NOT NULL,
            dataEmprestimo DATE NOT NULL,
            dataDevolucao DATE NOT NULL
        )`;
        try {
            const resultado = await executarComandoSQL(query, []);
            console.log('Tabela de Emprestimos criada com sucesso:', resultado);
        } catch (err) {
            console.error('Erro ao criar a tabela de Emprestimos:', err);
        }
    }

    async inserirEmprestimo(emprestimo: EmprestimoEntity): Promise<EmprestimoEntity> {
        const query = "INSERT INTO estoque2.Emprestimo (idLivro, usuarioID, dataEmprestimo, dataDevolucao) VALUES (?, ?, ?, ?)";

        try {
            const resultado = await executarComandoSQL(query, [emprestimo.idLivro, emprestimo.usuarioID, emprestimo.dataEmprestimo, emprestimo.dataDevolucao]);
            console.log('Emprestimo inserido com sucesso, ID: ', resultado.insertId);
            emprestimo.id = resultado.insertId;
            return emprestimo;
        } catch (err) {
            console.error('Erro ao inserir o emprestimo:', err);
            throw err;
        }
    }

    async atualizarEmprestimo(emprestimo: EmprestimoEntity): Promise<EmprestimoEntity> {
        const query = "UPDATE estoque2.Emprestimo SET idLivro = ?, usuarioID = ?, dataEmprestimo = ?, dataDevolucao = ? WHERE id = ?";

        try {
            const resultado = await executarComandoSQL(query, [emprestimo.idLivro, emprestimo.usuarioID, emprestimo.dataEmprestimo, emprestimo.dataDevolucao, emprestimo.id]);
            console.log('Emprestimo atualizado com sucesso, ID: ', resultado);
            return emprestimo;
        } catch (err) {
            console.error(`Erro ao atualizar o emprestimo de ID ${emprestimo.id}: ${err}`);
            throw err;
        }
    }

    async deletarEmprestimo(emprestimoId: number): Promise<void> {
        const query = "DELETE FROM estoque2.Emprestimo WHERE id = ?";

        try {
            await executarComandoSQL(query, [emprestimoId]);
            console.log('Emprestimo deletado com sucesso:', emprestimoId);
        } catch (err) {
            console.error('Erro ao deletar o emprestimo:', err);
            throw err;
        }
    }

    async filterEmprestimoPorId(id: number): Promise<EmprestimoEntity[]> {
        const query = "SELECT * FROM estoque2.Emprestimo WHERE id = ?";

        try {
            const resultado: EmprestimoEntity[] = await executarComandoSQL(query, [id]);
            console.log('Emprestimo localizado com sucesso, ID: ', resultado);
            return new Promise<EmprestimoEntity[]>((resolve) => {
                resolve(resultado);
            })
        } catch (err: any) {
            console.error(`Falha ao procurar a Emprestimo de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterEmprestimosPorUsuario(usuarioID: number): Promise<EmprestimoEntity[]> {
        const query = "SELECT * FROM estoque2.Emprestimo WHERE usuarioID = ?";

        try {
            const resultado = await executarComandoSQL(query, [usuarioID]);
            return resultado;
        } catch (err) {
            console.error(`Erro ao buscar empréstimos para o usuário de ID ${usuarioID}: ${err}`);
            throw err;
        }
    }

    async filterEmprestimosPorLivro(idLivro: number): Promise<EmprestimoEntity[]> {
        const query = "SELECT * FROM estoque2.Emprestimo WHERE idLivro = ?";

        try {
            const resultado = await executarComandoSQL(query, [idLivro]);
            return resultado;
        } catch (err) {
            console.error(`Erro ao buscar empréstimos para o livro de ID ${idLivro}: ${err}`);
            throw err;
        }
    }

    async listarTodosEmprestimos(): Promise<EmprestimoEntity[]> {
        const query = "SELECT * FROM estoque2.Emprestimo";

        try {
            const resultado = await executarComandoSQL(query, []);
            return resultado;
        } catch (err) {
            console.error(`Erro ao listar todos os empréstimos: ${err}`);
            throw err;
        }
    }
}
