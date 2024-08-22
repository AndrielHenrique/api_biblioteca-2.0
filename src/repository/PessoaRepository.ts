import { executarComandoSQL } from "../database/mysql";
import { PessoaEntity } from "../model/entity/PessoaEntity";

export class PessoaRepository {

    private static instance: PessoaRepository;

    public static getInstance(): PessoaRepository {
        if (!this.instance) {
            this.instance = new PessoaRepository();
        }
        return this.instance;
    }

    constructor() {
        this.createTable();
    }

    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS estoque2.Pessoa (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE
        )`;
        try {
            const resultado = await executarComandoSQL(query, []);
            console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Erro ao criar a tabela:', err);
        }
    }

    async inserirPessoa(pessoa: PessoaEntity): Promise<PessoaEntity> {
        const query = "INSERT INTO estoque2.Pessoa (name, email) VALUES (?, ?)";

        try {
            const resultado = await executarComandoSQL(query, [pessoa.name, pessoa.email]);
            console.log('Pessoa inserida com sucesso, ID: ', resultado.insertId);
            pessoa.id = resultado.insertId;
            return new Promise<PessoaEntity>((resolve) => {
                resolve(pessoa);
            });
        } catch (err) {
            console.error('Erro ao inserir a pessoa:', err);
            throw err;
        }
    }

    async atualizarPessoa(pessoa: PessoaEntity): Promise<PessoaEntity> {
        const query = "UPDATE estoque2.Pessoa SET name = ?, email = ? WHERE id = ?";

        try {
            const resultado = await executarComandoSQL(query, [pessoa.name, pessoa.email, pessoa.id]);
            console.log('Pessoa atualizada com sucesso, ID: ', resultado);
            return new Promise<PessoaEntity>((resolve) => {
                resolve(pessoa);
            });
        } catch (err: any) {
            console.error(`Erro ao atualizar a pessoa de ID ${pessoa.id}: ${err}`);
            throw err;
        }
    }

    async deletarPessoa(pessoaId: number): Promise<void> {
        try {
            const query = "DELETE FROM estoque2.Pessoa WHERE id = ?";
            await executarComandoSQL(query, [pessoaId]);
            console.log('Pessoa deletada com sucesso:', pessoaId);
        } catch (err) {
            console.error('Erro ao deletar a pessoa:', err);
            throw err;
        }
    }

    async filterPessoaPorId(id: number): Promise<PessoaEntity[]> {
        const query = "SELECT * FROM estoque2.Pessoa WHERE id = ?";

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Pessoa encontrada com sucesso, ID: ', resultado);
            return new Promise<PessoaEntity[]>((resolve) => {
                resolve(resultado);
            });
        } catch (err: any) {
            console.error(`Falha ao procurar a pessoa de ID ${id}: ${err}`);
            throw err;
        }
    }

    async filterPessoaPorNome(name: string): Promise<PessoaEntity[]> {
        const query = "SELECT * FROM estoque2.Pessoa WHERE name = ?";

        try {
            const resultado: PessoaEntity[] = await executarComandoSQL(query, [name]);
            console.log('Pessoas encontradas com sucesso, NAME: ', resultado);
            return new Promise<PessoaEntity[]>((resolve) => {
                resolve(resultado);
            });
        } catch (err: any) {
            console.error(`Falha ao procurar a pessoa com nome ${name}: ${err}`);
            throw err;
        }
    }
    async filterPessoaPorEmail(email: string): Promise<PessoaEntity[]> {
        const query = "SELECT * FROM estoque2.Pessoa WHERE email = ?";

        try {
            const resultado: PessoaEntity[] = await executarComandoSQL(query, [email]);
            console.log('Pessoas encontradas com sucesso, EMAIL: ', resultado);
            return new Promise<PessoaEntity[]>((resolve) => {
                resolve(resultado);
            });
        } catch (err: any) {
            console.error(`Falha ao procurar a pessoa com email ${email}: ${err}`);
            throw err;
        }
    }

    async listarTodasPessoas(): Promise<PessoaEntity[]> {
        const query = "SELECT * FROM estoque2.Pessoa";

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<PessoaEntity[]>((resolve) => {
                resolve(resultado);
            });
        } catch (err: any) {
            console.error(`Falha ao listar todas as pessoas: ${err}`);
            throw err;
        }
    }
}
