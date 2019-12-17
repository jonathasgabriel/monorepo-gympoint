import * as Yup from 'yup';
import { addMonths, parseISO, startOfDay, endOfDay } from 'date-fns';
import { Op } from 'sequelize';

import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Plan from '../models/Plan';

import EnrollmentMail from '../jobs/EnrollmentMail';
import Queue from '../../lib/Queue';

class EnrollmentController {
  async index(req, res) {
    const enrollments = await Enrollment.findAll({
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      include: [
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title'],
        },
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(enrollments);
  }

  async show(req, res) {
    const { id } = req.params;

    const enrollment = await Enrollment.findByPk(id, {
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      include: [
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title'],
        },
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
      ],
    });

    return res.json(enrollment);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number()
        .positive()
        .required(),
      plan_id: Yup.number()
        .positive()
        .required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { student_id, plan_id } = req.body;

    const student = await Student.findByPk(student_id);

    if (!student) {
      return res.status(400).json({ error: 'Student is not registered' });
    }

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exist' });
    }

    // Validate student can have only one active enrollment
    const studentAlreadyEnrolled = await Enrollment.findAll({
      where: {
        student_id: student.id,
        start_date: {
          [Op.lte]: endOfDay(new Date()),
        },
        end_date: {
          [Op.gte]: startOfDay(new Date()),
        },
      },
    });

    if (studentAlreadyEnrolled.length > 0) {
      return res
        .status(400)
        .json({ error: 'The student has an active enrollment' });
    }

    const start_date = parseISO(req.body.start_date);
    const end_date = addMonths(start_date, plan.duration);
    const price = plan.duration * plan.price;

    const enrollment = await Enrollment.create({
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });

    /**
     * Sends welcome/info email to students regarding their enrollment
     */
    await Queue.add(EnrollmentMail.key, {
      enrollment,
      student,
      plan,
    });

    return res.json({
      id: enrollment.id,
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().positive(),
      plan_id: Yup.number().positive(),
      start_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id } = req.params;

    const enrollment = await Enrollment.findByPk(id, {
      include: [
        {
          model: Plan,
          as: 'plan',
          attributes: ['duration', 'price'],
        },
      ],
    });

    if (!enrollment) {
      return res.status(400).json({ error: 'Enrollment does not exist' });
    }

    const { student_id, plan_id } = req.body;

    if (student_id && student_id !== enrollment.student_id) {
      const student = await Student.findByPk(student_id);

      if (!student) {
        return res.status(400).json({ error: 'Student is not registered' });
      }

      // Validate student can have only one enrollment active
      const studentAlreadyEnrolled = await Enrollment.findAll({
        where: {
          student_id: student.id,
          start_date: {
            [Op.lte]: endOfDay(new Date()),
          },
          end_date: {
            [Op.gte]: startOfDay(new Date()),
          },
        },
      });

      if (studentAlreadyEnrolled.length > 0) {
        return res
          .status(400)
          .json({ error: 'The student has an active enrollment' });
      }
    }

    let { plan } = enrollment;

    if (plan_id && plan_id !== enrollment.plan_id) {
      plan = await Plan.findByPk(plan_id);

      if (!plan) {
        return res.status(400).json({ error: 'Plan does not exist' });
      }
    }

    let { end_date } = enrollment;
    let { price } = enrollment;
    let { start_date } = enrollment;

    if (req.body.start_date && req.body.start_date !== enrollment.start_date) {
      start_date = parseISO(req.body.start_date);
    }

    end_date = addMonths(start_date, plan.duration);

    price = plan ? plan.duration * plan.price : enrollment.price;

    const { student_id: persistedStudentId } = await enrollment.update({
      ...req.body,
      start_date,
      end_date,
      price,
    });

    return res.json({
      id,
      student_id: persistedStudentId,
      plan,
      start_date,
      end_date,
      price,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const enrollment = await Enrollment.findByPk(id);

    if (!enrollment) {
      return res.status(400).json({ error: 'Enrollment does not exist' });
    }

    await enrollment.destroy();

    return res.status(204).json();
  }
}

export default new EnrollmentController();
