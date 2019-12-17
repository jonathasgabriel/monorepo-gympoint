import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class HelpOrderAnswerMail {
  get key() {
    return 'HelpOrderMail';
  }

  async handle({ data }) {
    const { helpOrder, student } = data;
    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Your question was answered!',
      template: 'helpOrder',
      context: {
        student: student.name,
        question: helpOrder.question,
        answer: helpOrder.answer,
        answerAt: format(parseISO(helpOrder.answerAt), 'yyyy-MM-dd'),
      },
    });
  }
}

export default new HelpOrderAnswerMail();
