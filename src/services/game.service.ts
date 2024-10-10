import { GameDTO } from "../dto/game.dto";
import { Console } from "../models/console.model";
import { Game } from "../models/game.model";
import {ConsoleDTO} from "../dto/console.dto";
import {ConsoleService} from "./console.service";
import {notFound} from "../error/NotFoundError";

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
    return Game.findOne({
      where:{
        id:id
      }
    })
  }

  public async createGame(title: string, console: ConsoleDTO): Promise<GameDTO | null> {
    const existingConsole = await Console.findByPk(console.id)
    if(!existingConsole) return notFound("Console");

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
}

export const gameService = new GameService();
