import { CategoriaEntity } from "../model/entity/CategoriaEntity";
import { EmprestimoEntity } from "../model/entity/EmprestimoEntity";
import { LivroEntity } from "../model/entity/LivroEntity";
import { CategoriaRepository } from "../repository/CategoriaRepository";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { LivroRepository } from "../repository/LivroRepository";

export class LivroService {

    private livroRepository = LivroRepository.getInstance();
    private categoriaRepository = CategoriaRepository.getInstance();
    private emprestimoRepository = EmprestimoRepository.getInstance();

    async cadastrarLivro(livroData: any): Promise<LivroEntity> {
        const { name, autor, categoriaID } = livroData;

        const categoriasExistentes = await this.categoriaRepository.filterCategoria(categoriaID);
        if (!categoriasExistentes || (Array.isArray(categoriasExistentes) && categoriasExistentes.length == 0)) {
            throw new Error("Categoria não encontrada.");
        }
        const livroExistente = await this.livroRepository.filterLivroByName(name)
        if (livroExistente.length > 0) {
            throw new Error("Já existe um livro com esse nome.");
        }

        const livro = new LivroEntity(undefined, name, autor, categoriaID);
        return this.livroRepository.inserirLivro(livro);
    }

    async atualizarLivro(livroData: any): Promise<LivroEntity> {
        const { id, name, autor, categoriaID } = livroData;

        const livroExistente: LivroEntity[] = await this.livroRepository.filterLivro(id);
        if (livroExistente.length == 0) {
            throw new Error("Livro não encontrado.");
        }

        const categoriasExistentes: CategoriaEntity[] = await this.categoriaRepository.filterCategoria(categoriaID);
        if (!categoriasExistentes || (Array.isArray(categoriasExistentes) && categoriasExistentes.length == 0)) {
            throw new Error("Categoria não encontrada.");
        }

        const livro = new LivroEntity(id, name, autor, categoriaID);
        await this.livroRepository.updateLivro(livro);
        console.log("Service - Update ", livro);
        return livro;

    }

    async deletarLivro(livroData: any): Promise<LivroEntity> {
        const { id, name, autor, categoriaID } = livroData;

        const livro = new LivroEntity(id, name, autor, categoriaID);
        const livrosEncontrados: LivroEntity[] = await this.livroRepository.getLivroByAll(livro.name, livro.autor, livro.categoriaID, livro.id);

        if (livrosEncontrados.length == 0) {
            throw new Error("Livro informado não existe.");
        }

        const emprestimoLivroExiste: EmprestimoEntity[] = await this.emprestimoRepository.filterEmprestimosPorLivro(id);
        if (emprestimoLivroExiste.length > 0) {
            throw new Error("Não foi possivel deletar o livro, pois existe um emprestimo vinculado a ele.");
        }

        await this.livroRepository.deleteLivro(livro.id);
        console.log("Service - Delete Categoria", livro.id);
        return livro;
    }


    async filtrarLivro(livroData: any): Promise<LivroEntity[]> {
        const idNumber = parseInt(livroData, 10);

        const produto: LivroEntity[] = await this.livroRepository.filterLivro(idNumber);
        if (produto.length == 0) {
            throw new Error('Não existe um livro com esse ID!');
        }
        console.log("Service - Filtrar", produto);
        return produto;
    }
    async filtrarLivroPorNome(livroData: any): Promise<LivroEntity[]> {
        const name: string = livroData;

        const produtos: LivroEntity[] = await this.livroRepository.filterLivroByName(name);
        if (produtos.length == 0) {
            throw new Error('Não existe um livro com esse nome...');
        }

        console.log("Service - Filtrar", produtos);
        return produtos;
    }

    async listarTodosLivros(): Promise<LivroEntity[]> {
        const produto: LivroEntity[] = await this.livroRepository.filterAllLivros();
        if (produto.length == 0) {
            throw new Error('Não existe livros cadastrados...');
        }
        console.log("Service - Filtrar Todos", produto);
        return produto;
    }

}