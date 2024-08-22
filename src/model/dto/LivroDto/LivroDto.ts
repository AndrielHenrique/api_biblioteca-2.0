export class LivroDto {
    id: number;
    name: string;
    autor: string;
    categoriaID: number;

    constructor(id?: number, name?: string, autor?: string, categoriaID?: number) {
        this.id = id || 0;
        this.name = name || '';
        this.autor = autor || '';
        this.categoriaID = categoriaID || 0;
    }
}