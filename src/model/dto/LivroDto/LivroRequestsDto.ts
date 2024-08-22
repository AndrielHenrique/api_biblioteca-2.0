export class LivroRequestsDto {
    name: string;
    autor: string;
    categoriaID: number;

    constructor(id?: number, name?: string, autor?: string, categoriaID?: number) {
        this.name = name || '';
        this.autor = autor || '';
        this.categoriaID = categoriaID || 0;
    }
}