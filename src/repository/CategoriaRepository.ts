import { query } from "express";
import { executarComandoSQL } from "../database/mysql";
import { CategoriaEntity } from "../model/entity/CategoriaEntity";


export class CategoriaRepository {
    private static instance: CategoriaRepository;

    public static getInstance(): CategoriaRepository {
        if (!this.instance) {
            this.instance = new CategoriaRepository();
        }
        return this.instance
    }

    constructor() {
        this.createTable();
    }
    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS estoque2.Categoria (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL
        )`;
        try {
            const resultado = await executarComandoSQL(query, []);
            console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async inserirCategoria(categoria: CategoriaEntity): Promise<CategoriaEntity> {
        const query = "INSERT INTO estoque2.Categoria (name) values (?)";

        try {
            const resultado = await executarComandoSQL(query, [categoria.name]);
            console.log('Categoria inserido com sucesso, ID: ', resultado.insertId);
            categoria.id = resultado.insertId;
            return new Promise<CategoriaEntity>((resolve) => {
                resolve(categoria);
            })
        } catch (err) {
            console.error('Erro ao inserir a categoria:', err);
            throw err;
        }
    }

    async updateCategoria(product: CategoriaEntity): Promise<CategoriaEntity> {
        const query = "UPDATE estoque2.Categoria set name = ? where id = ?;";

        try {
            const resultado = await executarComandoSQL(query, [product.name, product.id]);
            console.log('Categoria atualizada com sucesso, ID: ', resultado);
            return new Promise<CategoriaEntity>((resolve) => {
                resolve(product);
            })
        } catch (err: any) {
            console.error(`Erro ao atualizar a categoria de ID ${product.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async deleteCategoria(categoriaData: CategoriaEntity): Promise<CategoriaEntity[]> {
        const query = "DELETE FROM estoque2.Categoria WHERE id = ?";
        try {
            const resultado: CategoriaEntity[] = await executarComandoSQL(query, [categoriaData.id]);
            console.log('Categoria deletado com sucesso:', resultado);
            return resultado;
        } catch (err) {
            console.error('Erro ao deletar categoria:', err);
            throw err;
        }
    }

    async filterCategoria(id: number): Promise<CategoriaEntity[]> {
        const query = "SELECT * FROM estoque2.Categoria where id = ?";

        try {
            const resultado: CategoriaEntity[] = await executarComandoSQL(query, [id]);
            console.log('Categoria localizada com sucesso, ID: ', resultado);
            return new Promise<CategoriaEntity[]>((resolve) => {
                resolve(resultado);
            })
        } catch (err: any) {
            console.error(`Falha ao procurar a Categoria de ID ${id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterCategoriaByName(name: string): Promise<CategoriaEntity[]> {
        const query = "SELECT * FROM estoque2.Categoria where name = ?";

        try {
            const resultado: CategoriaEntity[] = await executarComandoSQL(query, [name]);
            console.log('Categoria localizada com sucesso, Nome: ', resultado);
            return new Promise<CategoriaEntity[]>((resolve) => {
                resolve(resultado);
            })

        } catch (err: any) {
            console.error(`Falha ao procurar o produto ${name} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filterAllCategoria(): Promise<CategoriaEntity[]> {
        const query = "SELECT * FROM estoque2.Categoria";

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<CategoriaEntity[]>((resolve) => {
                resolve(resultado);
            })
        } catch (err: any) {
            console.error(`Falha ao listar as categorias gerando o erro: ${err}`);
            throw err;
        }
    }


    async filterCategoriaByIdName(id?: number, name?: string): Promise<CategoriaEntity[]> {
        let query = "SELECT * FROM estoque2.Categoria WHERE";
        const params: any[] = [];

        if (id !== undefined) {
            query += " id = ?";
            params.push(id);
        }

        if (name) {
            query += (params.length ? " AND" : "") + " name = ?";
            params.push(name);
        }

        if (params.length === 0) {
            throw new Error("Pelo menos um dos parâmetros deve ser fornecido.");
        }

        try {
            const result: CategoriaEntity[] = await executarComandoSQL(query, params);
            if (result.length != 0) {
                console.log('Busca efetuada com sucesso:', result);
                return result;
            } else {
                throw new Error("Nao existe");
            }
        } catch (err) {
            console.error('Erro ao buscar categoria:', err);
            throw err;
        }
    }
}
