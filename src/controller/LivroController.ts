import { Controller, Route, Tags, Post, Body, Res, TsoaResponse, Put, Delete, Get, Query, Path } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { LivroRequestsDto } from "../model/dto/LivroDto/LivroRequestsDto";
import { LivroService } from "../service/LivroService";
import { LivroDto } from "../model/dto/LivroDto/LivroDto";

@Route("livro")
@Tags("Livro")

export class LivroController extends Controller {
    livroService = new LivroService();

    @Post()
    async cadastrarLivro(
        @Body() dto: LivroRequestsDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const product = await this.livroService.cadastrarLivro(dto);
            return sucess(201, new BasicResponseDto("Livro adicionado com sucesso", product));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined))
        }
    };

    @Put()
    async atualizarLivro(
        @Body() dto: LivroDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const product = await this.livroService.atualizarLivro(dto);
            return sucess(201, new BasicResponseDto("Livro atualizado com sucesso", product));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined))
        }
    }

    @Delete()
    async deletarLivro(
        @Body() dto: LivroDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const product = await this.livroService.deletarLivro(dto);
            return sucess(201, new BasicResponseDto("Livro deletado com sucesso", product));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined))
        }
    }

    @Get("id/{id}")
    async filtrarLivro(
        @Path() id: number,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const product = await this.livroService.filtrarLivro(id);
            return sucess(201, new BasicResponseDto("Mostranddo categoria por id", product));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined))
        }
    }

    @Get("name/{name}")
    async filtrarCategoriaPorNome(
        @Query() name: string,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const product = await this.livroService.filtrarLivroPorNome(name);
            return sucess(201, new BasicResponseDto("Listando categorias pelo nome", product));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined))
        }
    }

    @Get("all")
    async filtrarCategorias(
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const product = await this.livroService.listarTodosLivros();
            return sucess(201, new BasicResponseDto("Listando todos Livros", product));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined))
        }
    }
}