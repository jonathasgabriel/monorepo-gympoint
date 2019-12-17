import Student from '../models/Student';

class StudentLogInController {
  async store(req, res) {
    const { id } = req.body;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.json({ valid: false });
    }

    return res.json({ valid: true });
  }
}

export default new StudentLogInController();
