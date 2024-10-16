import {Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags} from "tsoa";
import { GameDTO } from "../dto/game.dto";
import { gameService } from "../services/game.service";
import {ConsoleDTO} from "../dto/console.dto";
import {consoleService} from "../services/console.service";
import {notFound} from "../error/NotFoundError";

@Route("games")
@Tags("Games")
export class GameController extends Controller {
  @Get("/")
  public async getAllGames(): Promise<GameDTO[]> {
    return gameService.getAllGames();
  }


  @Get("/{id}")
  public async getGameById(@Path() id: number): Promise<GameDTO | null> {
    return await gameService.getGame(id);
  }


  // Crée un nouveau jeu
  @Post("/")
  public async createGame(
      @Body() requestBody: GameDTO
  ): Promise<GameDTO | null> {
    const {title, console} = requestBody;
    return gameService.createGame(title, console);
  }


  // Met à jour un jeu par ID
  @Patch("{id}")
  public async updateGame(
      @Path() id: number,
      @Body() requestBody: GameDTO
  ): Promise<GameDTO | null> {
    const { title , console} = requestBody;
    return gameService.updateGame(id, title, console);
  }


  // Supprime un jeu par ID
  @Delete("{id}")
  public async deleteGame(@Path() id: number): Promise<void> {
    await gameService.deleteGame(id);
  }
}


