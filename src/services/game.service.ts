import { GameDTO } from "../dto/game.dto";
import { Console } from "../models/console.model";
import { Game } from "../models/game.model";
import {ConsoleDTO} from "../dto/console.dto";
import {consoleService} from "./console.service";
import {notFound} from "../error/NotFoundError";
import {Review} from "../models/review.model";
import {foreignKeyError} from "../error/ForeignKeyError";

export class GameService {
  public async getAllGames(): Promise<GameDTO[]> {
    return Game.findAll({
      include: [
        {
          model: Console,
          as: "console",
        },
      ],
    });
  }


  public async getGame(id: number): Promise<GameDTO | null> {
    const game = Game.findOne({
      where:{
        id:id
      }
    })
    if (!game) notFound("Game");
    return game;
  }

  public async createGame(title: string, console: ConsoleDTO): Promise<GameDTO | null> {
    await consoleService.getConsoleById(console.id);

    return Game.create({
      title:title,
      console_id:console.id,
    });
  }

  public async updateGame(id: number, title: string, console: ConsoleDTO): Promise<GameDTO | null> {
    const game = await Game.findByPk(id);
    if (!game) return notFound("Game");

    const existingConsole = await Console.findByPk(console.id);
    if (!existingConsole) return notFound("Console");

    game.title = title;
    game.console_id = console.id;
    await game.save();

    return game;
  }

  async deleteGame(id: number): Promise<void> {
    const reviewCount = await Review.count({
      where:{
        game_id:id
      }
    });
    if(reviewCount>0) foreignKeyError()

    const game = await Game.findByPk(id);
    if(!game) notFound("Game");
    await game.destroy();
  }

  public async getGameByConsoleId(id: number): Promise<GameDTO[] | null> {
    const console = await consoleService.getConsoleById(id);
    if(!console) notFound("Console");

    return  await Game.findAll({
      where:{
        console_id:id
      }
    })
  }
}

export const gameService = new GameService();
