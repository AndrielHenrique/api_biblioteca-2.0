import { EmprestimoEntity } from "../model/entity/EmprestimoEntity";
import { LivroEntity } from "../model/entity/LivroEntity";
import { UsuarioEntity } from "../model/entity/UsuarioEntity";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { LivroRepository } from "../repository/LivroRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";

export class EmprestimoService {

    private emprestimoRepository = EmprestimoRepository.getInstance();
    private livroRepository = LivroRepository.getInstance();
    private usuarioRepository = UsuarioRepository.getInstance();

    async cadastrarEmprestimo(emprestimoData: any): Promise<EmprestimoEntity> {
        const { idLivro, usuarioID, dataEmprestimo, dataDevolucao } = emprestimoData;

        const livro: LivroEntity[] = await this.livroRepository.filterLivro(idLivro);
        if (livro.length == 0) {
            throw new Error("Livro não encontrado.");
        }

        const usuario: UsuarioEntity[] = await this.usuarioRepository.filterUsuarioPorId(usuarioID);
        if (usuario.length == 0) {
            throw new Error("Usuário não encontrado.");
        }

        const emprestimoExiste: EmprestimoEntity[] = await this.emprestimoRepository.filterEmprestimosPorLivro(idLivro);
        if (emprestimoExiste.length > 0) {
            throw new Error("Já existe um emprestimo para esse Livro...");
        }
        const emprestimo = new EmprestimoEntity(undefined, idLivro, usuarioID, dataEmprestimo, dataDevolucao);
        return this.emprestimoRepository.inserirEmprestimo(emprestimo);
    }

    async atualizarEmprestimo(emprestimoData: any): Promise<EmprestimoEntity> {
        const { id, idLivro, usuarioID, dataEmprestimo, dataDevolucao } = emprestimoData;

        const emprestimoExistente: EmprestimoEntity[] = await this.emprestimoRepository.filterEmprestimoPorId(id);
        if (emprestimoExistente.length == 0) {
            throw new Error("Emprestimo não encontrado.");
        }

        const livro: LivroEntity[] = await this.livroRepository.filterLivro(idLivro);
        if (livro.length == 0) {
            throw new Error("Livro não encontrado.");
        }

        const usuario: UsuarioEntity[] = await this.usuarioRepository.filterUsuarioPorId(usuarioID);
        if (usuario.length == 0) {
            throw new Error("Usuário não encontrado.");
        }

        const emprestimo = new EmprestimoEntity(id, idLivro, usuarioID, dataEmprestimo, dataDevolucao);
        await this.emprestimoRepository.atualizarEmprestimo(emprestimo);
        console.log("Service - Update Emprestimo", emprestimo);
        return emprestimo;
    }

    async deletarEmprestimo(emprestimoData: any): Promise<EmprestimoEntity[]> {
        const { id } = emprestimoData;

        if (typeof id !== 'number') {
            throw new Error("ID informado incorreto.");
        }

        const emprestimo: EmprestimoEntity[] = await this.emprestimoRepository.filterEmprestimoPorId(id);
        if (emprestimo.length == 0) {
            throw new Error("Empréstimo informado não existe.");
        }

        await this.emprestimoRepository.deletarEmprestimo(id);
        console.log("Service - Delete Emprestimo", id);
        return emprestimo;
    }

    async filtrarEmprestimoPorId(id: number): Promise<EmprestimoEntity[]> {
        const emprestimo: EmprestimoEntity[] = await this.emprestimoRepository.filterEmprestimoPorId(id);
        if (emprestimo.length == 0) {
            throw new Error('Não existe um emprestimo com esse ID..')
        }
        console.log("Service - Filtrar Emprestimo por ID", emprestimo);
        return emprestimo;
    }

    async listarTodosEmprestimos(): Promise<EmprestimoEntity[]> {
        const emprestimos: EmprestimoEntity[] = await this.emprestimoRepository.listarTodosEmprestimos();
        if (emprestimos.length == 0) {
            throw new Error('Não existe emprestimos cadastrados..')
        }
        console.log("Service - Listar Todos os Emprestimos", emprestimos);
        return emprestimos;
    }

    async filtrarEmprestimosPorUsuario(usuarioID: number): Promise<EmprestimoEntity[]> {
        const emprestimos: EmprestimoEntity[] = await this.emprestimoRepository.filterEmprestimosPorUsuario(usuarioID);
        if (emprestimos.length == 0) {
            throw new Error('Não existe um emprestimo para esse usuarioID..')
        }
        console.log("Service - Filtrar Emprestimos por Usuario", emprestimos);
        return emprestimos;
    }

    async filtrarEmprestimosPorLivro(idLivro: number): Promise<EmprestimoEntity[]> {

        const livroExiste: LivroEntity[] = await this.livroRepository.filterLivro(idLivro);
        if (livroExiste.length > 0) {
            const emprestimos: EmprestimoEntity[] = await this.emprestimoRepository.filterEmprestimosPorLivro(idLivro);
            if (emprestimos.length == 0) {
                throw new Error('Não existe um emprestimo com esse Livro id..')
            }
            console.log("Service - Filtrar Emprestimos por Livro", emprestimos);
            return emprestimos;
        }
        throw new Error('Não existe um livro com esse Livro id..')

    }

}


