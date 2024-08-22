import { executarComandoSQL } from "../database/mysql";
import { LivroEntity } from "../model/entity/LivroEntity";


export class LivroRepository {

    private static instance: LivroRepository;

    public static getInstance(): LivroRepository {
        if (!this.instance) {
            this.instance = new LivroRepository();
        }
        return this.instance
    }
    constructor() {
        this.createTable();
    }
    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS estoque2.Livro (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            autor VARCHAR(255) NOT NULL,
            categoriaID INT NOT NULL
        )`;
        try {
            const resultado = await executarComandoSQL(query, []);
            console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async inserirLivro(livro: LivroEntity): Promise<LivroEntity> {
        const query = "INSERT INTO estoque2.Livro (name, autor, categoriaID) values (?, ?, ?)";

        try {
            const resultado = await executarComandoSQL(query, [livro.name, livro.autor, livro.categoriaID]);
            console.log('Livro inserido com sucesso, ID: ', resultado.insertId);
            livro.id = resultado.insertId;
            return livro;
        } catch (err) {
            console.error('Erro ao inserir a livro:', err);
            throw err;
        }
    }

    async updateLivro(product: LivroEntity): Promise<LivroEntity> {
        const query = "UPDATE estoque2.Livro set name = ?, autor = ?, categoriaID = ? where id = ?;";

        try {
            const resultado = await executarComandoSQL(query, [product.name, product.autor, product.categoriaID, product.id]);
            console.log('Livro atualizada com sucesso, ID: ', resultado);
            return new Promise<LivroEntity>((resolve) => {
                resolve(product);
            })
        } catch (err: any) {
            console.error(`Erro ao atualizar a livro de ID ${product.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async deleteLivro(livroId: number): Promise<void> {
        try {
            const query = "DELETE FROM estoque2.Livro WHERE id = ?";
            await executarComandoSQL(query, [livroId]);
            console.log('Cliente deletado com sucesso:', livroId);
        } catch (err) {
            console.error('Erro ao deletar cliente:', err);
            throw err;
        }
    }
    async filterLivro(id: number): Promise<LivroEntity[]> {
        const query = "SELECT * FROM estoque2.Livro where id = ?";

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Livro localizada com sucesso, ID: ', resultado);
            return new Promise<LivroEntity[]>((resolve) => {
                resolve(resultado);
            })
        } catch (err: any) {
            console.error(`Falha ao procurar o livro de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterLivroByName(name: string): Promise<LivroEntity[]> {
        const query = "SELECT * FROM estoque2.Livro where name = ?";

        try {
            const resultado: LivroEntity[] = await executarComandoSQL(query, [name]);
            console.log('Livro localizada com sucesso, NAME: ', resultado);
            return new Promise<LivroEntity[]>((resolve) => {
                resolve(resultado);
            })
        } catch (err: any) {
            console.error(`Falha ao procurar o livro de ${name} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterAllLivros(): Promise<LivroEntity[]> {
        const query = "SELECT * FROM estoque2.Livro";

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<LivroEntity[]>((resolve) => {
                resolve(resultado);
            })
        } catch (err: any) {
            console.error(`Falha ao listar as livros gerando o erro: ${err}`);
            throw err;
        }
    }

    async getLivroByAll(name?: string, autor?: string, categoriaID?: number, id?: number): Promise<LivroEntity[]> {
        let query = "SELECT * FROM estoque2.Livro WHERE";
        const params: any[] = [];

        if (name) {
            query += " name = ?";
            params.push(name);
        }

        if (autor) {
            query += (params.length ? " AND" : "") + " autor = ?";
            params.push(autor);
        }

        if (categoriaID !== undefined) {
            query += (params.length ? " AND" : "") + " categoriaID = ?";
            params.push(categoriaID);
        }

        if (id !== undefined) {
            query += (params.length ? " AND" : "") + " id = ?";
            params.push(id);
        }

        if (params.length === 0) {
            throw new Error("Pelo menos um dos parâmetros deve ser fornecido.");
        }

        try {
            const result: LivroEntity[] = await executarComandoSQL(query, params);
            console.log('Busca efetuada com sucesso:', result);
            return result;
        } catch (err) {
            console.error('Erro ao buscar livro:', err);
            throw err;
        }
    }
}