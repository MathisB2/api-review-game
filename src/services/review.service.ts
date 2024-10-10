import {Review} from "../models/review.model";
import {ReviewDTO} from "../dto/review.dto";
import {Game} from "../models/game.model";

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
        //todo
    }
}

export const reviewService = new ReviewService();
