import { subDays } from 'date-fns';

import Checkin from '../schemas/Checkin';

class CheckinController {
  async index(req, res) {
    const checkins = await Checkin.find({
      student: req.params.id,
    }).sort({
      createdAt: 'desc',
    });

    return res.json(checkins);
  }

  async store(req, res) {
    // validate max 5 checkins in a period of 7 days
    const checkins = await Checkin.find({
      student: req.params.id,
      createdAt: { $gte: subDays(new Date(), 7) },
    });

    if (checkins.length >= 5) {
      return res.status(400).json({
        error: 'You can only checkin at most 5 times in a period of 7 days',
      });
    }

    const checkin = await Checkin.create({
      student: req.params.id,
    });

    return res.json(checkin);
  }
}

export default new CheckinController();
