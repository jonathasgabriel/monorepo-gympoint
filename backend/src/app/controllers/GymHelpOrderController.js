import * as Yup from 'yup';

import HelpOrderMail from '../jobs/HelpOrderMail';
import Queue from '../../lib/Queue';

import Student from '../models/Student';
import HelpOrder from '../schemas/HelpOrder';

class GymHelpOrderController {
  async index(req, res) {
    const helpOrders = await HelpOrder.find({
      answer: null,
    }).sort({
      createdAt: 'asc',
    });

    return res.json(helpOrders);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }
    const helpOrder = await HelpOrder.findById(req.params.id);

    if (!helpOrder) {
      return res.status(400).json({ error: 'Help Order does not exist' });
    }

    if (helpOrder.answer) {
      return res
        .status(400)
        .json({ error: 'This help order is already answered' });
    }

    const updatedHelpOrder = await HelpOrder.findByIdAndUpdate(
      req.params.id,
      { answer: req.body.answer, answerAt: new Date() },
      { new: true }
    );

    const student = await Student.findByPk(helpOrder.studentId);

    /**
     * Sends email to students regarding their help order questions
     */
    await Queue.add(HelpOrderMail.key, {
      helpOrder: updatedHelpOrder,
      student,
    });

    return res.json(updatedHelpOrder);
  }
}

export default new GymHelpOrderController();
