import { CategoriaEntity } from "../model/entity/CategoriaEntity";
import { CategoriaRepository } from "../repository/CategoriaRepository";

export class CategoriaService {

    private categoriaRepository = CategoriaRepository.getInstance();

    async cadastrarCategoria(categoriaData: any): Promise<CategoriaEntity> {
        const { name } = categoriaData;

        const categoria = new CategoriaEntity(undefined, name);

        const categoriasExistentes = await this.categoriaRepository.filterCategoriaByName(name);
        if (categoriasExistentes.length > 0) {
            throw new Error("Categoria com esse nome já existe.");
        }

        const novaCategoria = await this.categoriaRepository.inserirCategoria(categoria);
        console.log("Service - Insert Categoria", novaCategoria);
        return novaCategoria;
    }

    async atualizarCategoria(categoriaData: any): Promise<CategoriaEntity> {
        const { id, name } = categoriaData;

        if (typeof id !== 'number') {
            throw new Error("Id informado incorreto.");
        }

        if (typeof name !== 'string' || name.trim() == '') {
            throw new Error("Nome da categoria deve ser uma string não vazia.");
        }

        const categoria = new CategoriaEntity(id, name);

        const categoriasExistentes: CategoriaEntity[] = await this.categoriaRepository.filterCategoria(categoria.id);
        if (categoriasExistentes.length == 0) {
            throw new Error("Categoria informada inexistente.");
        }

        await this.categoriaRepository.updateCategoria(categoria);
        console.log("Service - Update Categoria", categoria);
        return categoria;
    }

    async deletarCategoria(categoriaData: any): Promise<CategoriaEntity[]> {
        const { id, name } = categoriaData;

        if (typeof id !== 'number') {
            throw new Error("Id informado incorreto.");
        }

        const categoria = new CategoriaEntity(id, name);

        const categoriasExistentes: any = await this.categoriaRepository.filterCategoriaByIdName(id, name);
        if (categoriasExistentes.length != 0) {
            await this.categoriaRepository.deleteCategoria(categoria);
            console.log("Service - Delete Categoria", id);
            return categoriasExistentes;
        }
        else {
            throw new Error("Categoria informada nao existe.");
        }

    }

    async filtrarCategoriaPorId(id: any): Promise<CategoriaEntity[]> {
        const idNumber = parseInt(id, 10);

        if (!idNumber) {
            throw new Error("Id informado é inválido.");
        }

        const categorias: CategoriaEntity[] = await this.categoriaRepository.filterCategoria(idNumber);
        if (categorias.length == 0) {
            throw new Error("Id informado é inválido.");
        }
        return categorias;
    }

    async filtrarCategoriaPorNome(name: string): Promise<CategoriaEntity[]> {
        const nome: string = name;

        if (typeof nome !== 'string' || nome.trim() == '') {
            throw new Error("Nome da categoria deve ser uma string não vazia.");
        }

        const categorias: CategoriaEntity[] = await this.categoriaRepository.filterCategoriaByName(nome);
        if (categorias.length == 0) {
            throw new Error("Não existe categoria com esse Nome...");
        }

        console.log("Service - Filtrar Categoria por Nome", categorias);
        return categorias;
    }

    async listarTodasCategorias(): Promise<CategoriaEntity[]> {
        const categorias: CategoriaEntity[] = await this.categoriaRepository.filterAllCategoria();
        console.log("Service - Listar Todas as Categorias", categorias);
        return categorias;
    }
}
