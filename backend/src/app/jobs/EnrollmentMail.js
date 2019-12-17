import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class EnrollmentMail {
  get key() {
    return 'EnrollmentMail';
  }

  async handle({ data }) {
    const { enrollment, student, plan } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Welcome to the GYMPOINT experience',
      template: 'enrollment',
      context: {
        student: student.name,
        plan: plan.title,
        start: format(parseISO(enrollment.start_date), 'yyyy-MM-dd'),
        end: format(parseISO(enrollment.end_date), 'yyyy-MM-dd'),
        price: enrollment.price,
      },
    });
  }
}

export default new EnrollmentMail();
