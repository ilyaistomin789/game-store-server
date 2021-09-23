import { NextFunction, Request, Response } from 'express';
import { UserRatingsRepository } from '../../db';

const addRatingForProductService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const productId = req.params.id;
    const { rating, comments } = req.body;
    if (isNaN(rating) || !new RegExp(/^([1-9]|10)$/).test(rating)) {
      throw new Error('Wrong rating');
    } else {
      const { id, _id, role } = req.user;
      const data = {
        product: productId,
        rating: rating,
        comments: comments ? comments : null,
        account: _id ? `${_id}` : `${id}`,
        role: role,
      };
      await UserRatingsRepository.addUserRating(data);
      res.send('User rating was added successfully');
    }
  } catch (e) {
    res.status(400);
    next(e);
  }
};

export default addRatingForProductService;
