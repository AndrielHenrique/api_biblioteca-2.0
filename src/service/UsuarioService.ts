import { UsuarioEntity } from "../model/entity/UsuarioEntity";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { PessoaRepository } from "../repository/PessoaRepository";
import { PessoaEntity } from "../model/entity/PessoaEntity";

export class UsuarioService {

    private usuarioRepository = UsuarioRepository.getInstance();
    private pessoaRepository = PessoaRepository.getInstance();

    async cadastrarUsuario(usuarioData: any): Promise<UsuarioEntity> {
        const { idPessoa, senha } = usuarioData;

        const usuarioExistente: UsuarioEntity[] = await this.filtrarUsuarioPorIdPessoa(idPessoa);
        if (usuarioExistente.length > 0) {
            throw new Error("Usuario ja existe.");
        }

        const pessoa: PessoaEntity[] = await this.pessoaRepository.filterPessoaPorId(idPessoa);
        if (!pessoa || (Array.isArray(pessoa) && pessoa.length == 0)) {
            throw new Error("Pessoa não encontrada.");
        }
        const usuario = new UsuarioEntity(undefined, idPessoa, senha);

        return this.usuarioRepository.inserirUsuario(usuario);
    }

    async atualizarUsuario(usuarioData: any): Promise<UsuarioEntity> {
        const { id, idPessoa, senha } = usuarioData;

        const idUsuario: UsuarioEntity[] = await this.usuarioRepository.filterUsuarioPorId(id);
        if (idUsuario.length == 0) {
            throw new Error("Usuario não encontrada.");
        }

        const pessoa: PessoaEntity[] = await this.pessoaRepository.filterPessoaPorId(idPessoa);
        if (!pessoa || (Array.isArray(pessoa) && pessoa.length == 0)) {
            throw new Error("Pessoa não encontrada.");
        }

        const usuario = new UsuarioEntity(id, idPessoa, senha);
        await this.usuarioRepository.atualizarUsuario(usuario);
        console.log("Service - Update Usuario", usuario);
        return usuario;
    }

    async deletarUsuario(usuarioData: any): Promise<UsuarioEntity[]> {
        const { id } = usuarioData;

        const usuario: UsuarioEntity[] = await this.usuarioRepository.filterUsuarioPorId(id);
        if (usuario.length == 0) {
            throw new Error("Usuário informado inexistente.");
        }

        await this.usuarioRepository.deletarUsuario(id);
        console.log("Service - Delete Usuario", id);
        return usuario;
    }

    async filtrarUsuarioPorId(id: number): Promise<UsuarioEntity[]> {
        const usuario: UsuarioEntity[] = await this.usuarioRepository.filterUsuarioPorId(id);
        if (usuario.length == 0) {
            throw new Error('Não existe um usuario com esse id...');
        }
        console.log("Service - Filtrar Usuario por ID", usuario);
        return usuario;
    }

    async filtrarUsuarioPorIdPessoa(idPessoa: number): Promise<UsuarioEntity[]> {
        const usuarios: UsuarioEntity[] = await this.usuarioRepository.filterUsuarioPorIdPessoa(idPessoa);
        if (usuarios.length == 0) {
            throw new Error('Não existe uma pessoa com usuario com esse id...');
        }
        console.log("Service - Filtrar Usuario por ID Pessoa", usuarios);
        return usuarios;
    }

    async listarTodosUsuarios(): Promise<UsuarioEntity[]> {
        const usuarios: UsuarioEntity[] = await this.usuarioRepository.listarTodosUsuarios();
        if (usuarios.length == 0) {
            throw new Error('Não existem usuarios cadastrados..');
        }
        console.log("Service - Listar Todos os Usuários", usuarios);
        return usuarios;
    }
}
