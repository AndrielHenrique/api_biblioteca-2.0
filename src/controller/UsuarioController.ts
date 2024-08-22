import { Controller, Route, Tags, Post, Body, Res, TsoaResponse, Put, Delete, Get, Query, Path } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { UsuarioRequestsDto } from "../model/dto/UsuarioDto/UsuarioRequestsDto";
import { UsuarioService } from "../service/UsuarioService";
import { UsuarioDto } from "../model/dto/UsuarioDto/UsuarioDto";

@Route("usuario")
@Tags("Usuario")
export class UsuarioController extends Controller {
    usuarioService = new UsuarioService();

    @Post()
    async cadastrarUsuario(
        @Body() dto: UsuarioRequestsDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const usuario = await this.usuarioService.cadastrarUsuario(dto);
            return success(201, new BasicResponseDto("Usuário adicionado com sucesso", usuario));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Put()
    async atualizarUsuario(
        @Body() dto: UsuarioDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const usuario = await this.usuarioService.atualizarUsuario(dto);
            return success(201, new BasicResponseDto("Usuário atualizado com sucesso", usuario));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Delete()
    async deletarUsuario(
        @Body() dto: UsuarioDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const usuario = await this.usuarioService.deletarUsuario(dto);
            return success(201, new BasicResponseDto("Usuário deletado com sucesso", usuario));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("id/{id}")
    async filtrarUsuarioPorId(
        @Path() id: number,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const usuario = await this.usuarioService.filtrarUsuarioPorId(id);
            return success(201, new BasicResponseDto("Usuário encontrado pelo ID", usuario));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("all")
    async listarTodosUsuarios(
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const usuarios = await this.usuarioService.listarTodosUsuarios();
            return success(201, new BasicResponseDto("Listando todos os usuários", usuarios));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }
}
