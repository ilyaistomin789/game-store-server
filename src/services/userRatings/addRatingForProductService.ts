import { NextFunction, Request, Response } from 'express';
import { UserRatingsRepository } from '../../db';
import { IAccount } from '../../db/interfaces/account.interface';

const addRatingForProductService = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const productId = req.params.id;
    const { rating, comments } = req.body;
    if (isNaN(rating) || !new RegExp(/^([1-9]|10)$/).test(rating)) {
      throw new Error('Wrong rating');
    } else {
      const user = <IAccount>req.user;
      const data = {
        product: productId,
        rating: rating,
        comments: comments ? comments : null,
        account: user._id ? `${user._id}` : `${user.id}`,
        role: user.role,
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
