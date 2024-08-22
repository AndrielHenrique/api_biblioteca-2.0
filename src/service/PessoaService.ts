import { PessoaEntity } from "../model/entity/PessoaEntity";
import { PessoaRepository } from "../repository/PessoaRepository";

export class PessoaService {

    private pessoaRepository = PessoaRepository.getInstance();

    async cadastrarPessoa(pessoaData: any): Promise<PessoaEntity> {
        const { name, email } = pessoaData;

        const pessoasExistentes: PessoaEntity[] = await this.pessoaRepository.filterPessoaPorEmail(email);
        if (pessoasExistentes.length > 0) {
            throw new Error("Já existe uma pessoa cadastrada com esse e-mail.");
        }

        const pessoa = new PessoaEntity(undefined, name, email);
        return this.pessoaRepository.inserirPessoa(pessoa);
    }

    async atualizarPessoa(pessoaData: any): Promise<PessoaEntity> {
        const { id, name, email } = pessoaData;

        const pessoaExistente: PessoaEntity[] = await this.pessoaRepository.filterPessoaPorId(id);
        if (pessoaExistente.length == 0) {
            throw new Error("Pessoa não encontrado.");
        }

        const pessoa = new PessoaEntity(id, name, email);
        await this.pessoaRepository.atualizarPessoa(pessoa);
        console.log("Service - Update Pessoa", pessoa);
        return pessoa;
    }

    async deletarPessoa(pessoaData: any): Promise<PessoaEntity[]> {
        const { id } = pessoaData;

        const pessoa: PessoaEntity[] = await this.pessoaRepository.filterPessoaPorId(id);
        if (pessoa.length == 0) {
            throw new Error("Pessoa informada não existe");
        }

        await this.pessoaRepository.deletarPessoa(id);
        console.log("Service - Delete Pessoa", id);
        return pessoa;
    }

    async filtrarPessoaPorId(id: number): Promise<PessoaEntity[]> {
        const pessoa: PessoaEntity[] = await this.pessoaRepository.filterPessoaPorId(id);
        if (pessoa.length == 0) {
            throw new Error("Pessoa informada não existe");
        }
        console.log("Service - Filtrar Pessoa por ID", pessoa);
        return pessoa;
    }

    async filtrarPessoaPorNome(name: string): Promise<PessoaEntity[]> {
        const pessoas: PessoaEntity[] = await this.pessoaRepository.filterPessoaPorNome(name);
        if (pessoas.length == 0) {
            throw new Error("Não existe pessoas com esse nome cadastrado.");
        }
        console.log("Service - Filtrar Pessoa por Nome", pessoas);
        return pessoas;
    }

    async listarTodasPessoas(): Promise<PessoaEntity[]> {
        const pessoas: PessoaEntity[] = await this.pessoaRepository.listarTodasPessoas();
        if (pessoas.length == 0) {
            throw new Error("Não existe pessoas cadastradas!");
        }
        console.log("Service - Listar Todas as Pessoas", pessoas);
        return pessoas;
    }
}
