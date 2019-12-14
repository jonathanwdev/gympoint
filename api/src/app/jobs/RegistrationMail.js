import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class RegistrationMail {
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { student, finishedRegist, plan } = data;
    console.log('a fila executou');
    await Mail.sendMail({
      to: `${student.name}  <${student.email}>`,
      subject: 'Bem vindo ao GymPoint!',
      template: 'registration',
      context: {
        student: student.name,
        plan: plan.title,
        end_date: format(
          parseISO(finishedRegist),
          "'Dia' dd 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        ),
        price: plan.price * plan.duration,
      },
    });
  }
}

export default new RegistrationMail();
