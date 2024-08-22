import { executarComandoSQL } from "../database/mysql";
import { UsuarioEntity } from "../model/entity/UsuarioEntity";

export class UsuarioRepository {

    private static instance: UsuarioRepository;

    public static getInstance(): UsuarioRepository {
        if (!this.instance) {
            this.instance = new UsuarioRepository();
        }
        return this.instance;
    }

    constructor() {
        this.createTable();
    }

    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS estoque2.Usuario (
            id INT AUTO_INCREMENT PRIMARY KEY,
            idPessoa INT NOT NULL,
            senha VARCHAR(255) NOT NULL
        )`;
        try {
            const resultado = await executarComandoSQL(query, []);
            console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Erro ao criar a tabela:', err);
        }
    }

    async inserirUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity> {
        const query = "INSERT INTO estoque2.Usuario (idPessoa, senha) VALUES (?, ?)";

        try {
            const resultado = await executarComandoSQL(query, [usuario.idPessoa, usuario.senha]);
            console.log('Usuário inserido com sucesso, ID: ', resultado.insertId);
            usuario.id = resultado.insertId;
            return new Promise<UsuarioEntity>((resolve) => {
                resolve(usuario);
            });
        } catch (err) {
            console.error('Erro ao inserir o usuário:', err);
            throw err;
        }
    }

    async atualizarUsuario(usuario: UsuarioEntity): Promise<UsuarioEntity> {
        const query = "UPDATE estoque2.Usuario SET idPessoa = ?, senha = ? WHERE id = ?";

        try {
            const resultado = await executarComandoSQL(query, [usuario.idPessoa, usuario.senha, usuario.id]);
            console.log('Usuário atualizado com sucesso, ID: ', resultado);
            return new Promise<UsuarioEntity>((resolve) => {
                resolve(usuario);
            });
        } catch (err: any) {
            console.error(`Erro ao atualizar o usuário de ID ${usuario.id}: ${err}`);
            throw err;
        }
    }

    async deletarUsuario(usuarioId: number): Promise<void> {
        try {
            const query = "DELETE FROM estoque2.Usuario WHERE id = ?";
            await executarComandoSQL(query, [usuarioId]);
            console.log('Usuário deletado com sucesso:', usuarioId);
        } catch (err) {
            console.error('Erro ao deletar o usuário:', err);
            throw err;
        }
    }

    async filterUsuarioPorId(id: number): Promise<UsuarioEntity[]> {
        const query = "SELECT * FROM estoque2.Usuario WHERE id = ?";

        try {
            const resultado = await executarComandoSQL(query, [id]);
            console.log('Usuário encontrado com sucesso, ID: ', resultado);
            return new Promise<UsuarioEntity[]>((resolve) => {
                resolve(resultado);
            });
        } catch (err: any) {
            console.error(`Falha ao procurar o usuário de ID ${id}: ${err}`);
            throw err;
        }
    }

    async filterUsuarioPorIdPessoa(idPessoa: number): Promise<UsuarioEntity[]> {
        const query = "SELECT * FROM estoque2.Usuario WHERE idPessoa = ?";

        try {
            const resultado: UsuarioEntity[] = await executarComandoSQL(query, [idPessoa]);
            console.log('Usuários encontrados com sucesso, ID Pessoa: ', resultado);
            return new Promise<UsuarioEntity[]>((resolve) => {
                resolve(resultado);
            });
        } catch (err: any) {
            console.error(`Falha ao procurar o usuário com ID Pessoa ${idPessoa}: ${err}`);
            throw err;
        }
    }

    async listarTodosUsuarios(): Promise<UsuarioEntity[]> {
        const query = "SELECT * FROM estoque2.Usuario";

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<UsuarioEntity[]>((resolve) => {
                resolve(resultado);
            });
        } catch (err: any) {
            console.error(`Falha ao listar todos os usuários: ${err}`);
            throw err;
        }
    }
}
