import { Controller, Route, Tags, Post, Body, Res, TsoaResponse, Put, Delete, Get, Query, Path } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { CategoriaRequestsDto } from "../model/dto/CategoriaDto/CategoriaRequestsDto";
import { CategoriaService } from "../service/CategoriaService";
import { CategoriaDto } from "../model/dto/CategoriaDto/CategoriaDto";
@Route("categoria")
@Tags("Categoria")

export class CategoriaController extends Controller {
    categoriaService = new CategoriaService();

    @Post()
    async cadastrarCategoria(
        @Body() dto: CategoriaRequestsDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const product = await this.categoriaService.cadastrarCategoria(dto);
            return sucess(201, new BasicResponseDto("Categoria criada com sucesso", product));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined))
        }
    };

    @Put()
    async atualizarCategoria(
        @Body() dto: CategoriaDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const product = await this.categoriaService.atualizarCategoria(dto);
            return sucess(201, new BasicResponseDto("Categoria atualizada com sucesso", product));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined))
        }
    }

    @Delete()
    async deletarCategoria(
        @Body() dto: CategoriaDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const product = await this.categoriaService.deletarCategoria(dto);
            return sucess(201, new BasicResponseDto("Categoria deletada com sucesso", product));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined))
        }
    }

    @Get("id/{id}")
    async filtrarCategoria(
        @Path() id: number,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const product = await this.categoriaService.filtrarCategoriaPorId(id);
            return sucess(201, new BasicResponseDto("Mostranddo categoria por id", product));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined))
        }
    }

    @Get("name")
    async filtrarCategoriaPorNome(
        @Query() name: string,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const product = await this.categoriaService.filtrarCategoriaPorNome(name);
            return sucess(201, new BasicResponseDto("Listando categorias pelo nome", product));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined))
        }
    }

    @Get("all")
    async listarTodosCategoria(
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() sucess: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const product = await this.categoriaService.listarTodasCategorias();
            return sucess(201, new BasicResponseDto("Listando todas Categorias", product));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined))
        }
    }
}
