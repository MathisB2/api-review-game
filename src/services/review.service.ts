import {Review} from "../models/review.model";
import {ReviewDTO} from "../dto/review.dto";
import {Game} from "../models/game.model";
import {notFound} from "../error/NotFoundError";
import {GameDTO} from "../dto/game.dto";

import {gameService} from "./game.service";

export class ReviewService {
    public async getAllReviews(): Promise<ReviewDTO[]> {
        return Review.findAll({
            include:[
                {
                    model: Game,
                    as: "game"
                }
            ]
        });
    }


    public async getReviewById(id: number): Promise<ReviewDTO> {
        const review = await Review.findByPk(id);
        if(!review) notFound("Review");
        return review
    }



    public async createReview(gameId: number | undefined, rating: number, reviewText: string): Promise<ReviewDTO | null> {
        if(!gameId) return notFound("Game");
        await gameService.getGame(gameId);

        return Review.create({
            game_id: gameId,
            rating: rating,
            review_text: reviewText
        });

    }



    public async updateReview(id: number, game: GameDTO | undefined, rating: number, review_text: string): Promise<ReviewDTO | null> {
        const review = await Review.findByPk(id);
        if (!review) return notFound("Review");

        if(!game?.id) return notFound("Game");
        const existingGame = await Game.findByPk(game.id);
        if (!existingGame) return notFound("Game");


        review.game_id = game.id;
        review.rating = rating;
        review.review_text = review_text;
        await review.save();

        return review;
    }


    async deleteReview(id: number): Promise<void> {
        const review = await Review.findByPk(id);
        if(!review) notFound("Review");
        await review.destroy();
    }

    async getReviewsByGameId(id: number): Promise<ReviewDTO[] | null> {
        const game = await gameService.getGame(id);
        if(!game) notFound("Game");

        return  await Review.findAll({
            where:{
                game_id:id
            }
        })
    }
}

export const reviewService = new ReviewService();
