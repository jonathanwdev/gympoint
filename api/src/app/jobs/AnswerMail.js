import Mail from '../../lib/Mail';

class AnswerMail {
  get key() {
    return 'AnswerMail';
  }

  async handle({ data }) {
    const { helpOrders, answer } = data;
    await Mail.sendMail({
      to: `${helpOrders.Student.name}  <${helpOrders.Student.email}>`,
      subject: 'Pedido de ajuda',
      template: 'answer',
      context: {
        student: helpOrders.Student.name,
        question: helpOrders.question,
        answer,
      },
    });
  }
}

export default new AnswerMail();
