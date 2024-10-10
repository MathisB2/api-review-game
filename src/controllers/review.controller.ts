import {Controller, Get, Route, Tags} from "tsoa";
import {ReviewDTO} from "../dto/review.dto";
import {reviewService} from "../services/review.service";
@Route("reviews")
@Tags("Reviews")
export class ReviewController extends Controller {
    @Get("/")
    public async getAllReviews(): Promise<ReviewDTO[]> {
        return reviewService.getAllReviews();
    }
}
