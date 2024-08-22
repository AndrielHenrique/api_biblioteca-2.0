export class CategoriaRequestsDto {
    name: string;

    constructor(id?: number, name?: string) {
        this.name = name || '';
    }
}