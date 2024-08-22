import { Controller, Route, Tags, Post, Body, Res, TsoaResponse, Put, Delete, Get, Query, Path } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { PessoaRequestsDto } from "../model/dto/PessoaDto/PessoaRequestsDto";
import { PessoaService } from "../service/PessoaService";
import { PessoaDto } from "../model/dto/PessoaDto/PessoaDto";

@Route("pessoa")
@Tags("Pessoa")
export class PessoaController extends Controller {
    pessoaService = new PessoaService();

    @Post()
    async cadastrarPessoa(
        @Body() dto: PessoaRequestsDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const pessoa = await this.pessoaService.cadastrarPessoa(dto);
            return success(201, new BasicResponseDto("Pessoa adicionada com sucesso", pessoa));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Put()
    async atualizarPessoa(
        @Body() dto: PessoaDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const pessoa = await this.pessoaService.atualizarPessoa(dto);
            return success(201, new BasicResponseDto("Pessoa atualizada com sucesso", pessoa));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Delete()
    async deletarPessoa(
        @Body() dto: PessoaDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const pessoa = await this.pessoaService.deletarPessoa(dto);
            return success(201, new BasicResponseDto("Pessoa deletada com sucesso", pessoa));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("id/{id}")
    async filtrarPessoaPorId(
        @Path() id: number,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const pessoa = await this.pessoaService.filtrarPessoaPorId(id);
            return success(201, new BasicResponseDto("Pessoa encontrada pelo ID", pessoa));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get()
    async filtrarPessoaPorNome(
        @Query() name: string,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const pessoa = await this.pessoaService.filtrarPessoaPorNome(name);
            return success(201, new BasicResponseDto("Pessoa(s) encontrada(s) pelo nome", pessoa));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("all")
    async listarTodasPessoas(
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const pessoas = await this.pessoaService.listarTodasPessoas();
            return success(201, new BasicResponseDto("Listando todas as pessoas", pessoas));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }
}
