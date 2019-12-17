import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll();

    return res.json(plans);
  }

  async show(req, res) {
    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    return res.json(plan);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .positive()
        .required(),
      price: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const planTitlelreadyExists = await Plan.findOne({
      where: { title: req.body.title },
    });

    if (planTitlelreadyExists) {
      return res.status(400).json({ error: 'Plan already exists' });
    }

    const { id, title, duration, price } = await Plan.create(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number().positive(),
      price: Yup.number().positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exist' });
    }

    // If title has changed, then check for unique contraint
    if (req.body.title && plan.title !== req.body.title) {
      const uniquePlanAlreadyExists = Plan.findOne({
        where: { title: req.body.title },
      });

      if (uniquePlanAlreadyExists) {
        return res
          .status(400)
          .json({ error: 'A plan with the provided title already exists' });
      }
    }

    const { title, duration, price } = await plan.update(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exist' });
    }

    await plan.destroy();

    return res.status(204).json();
  }
}

export default new PlanController();
