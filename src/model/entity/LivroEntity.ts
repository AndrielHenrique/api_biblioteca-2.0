export class LivroEntity {
    id: number;
    name: string;
    autor: string;
    categoriaID: number;

    constructor(id?: number, name?: string, autor?: string, categoriaID?: number) {
        this.validatesInformation(name, autor, categoriaID);
        this.id = id || 0;
        this.name = name || '';
        this.autor = autor || '';
        this.categoriaID = categoriaID || 0;
    }
    private validatesInformation(name: any, autor: any, categoriaID: any) {
        let error = '';
        if (typeof name !== 'string') {
            error += ("Informações incompletas ou incorretas. ");
        }
        if (typeof autor !== 'string') {
            error += ("Informações incompletas ou incorretas. ");
        }
        if (typeof categoriaID !== 'number') {
            error += ("Informações incompletas ou incorretas. ");
        }
        if (error != '') {
            throw new Error(error);
        }
    }
}