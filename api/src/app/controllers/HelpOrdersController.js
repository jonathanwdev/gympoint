import * as Yup from 'yup';
import HelpOrders from '../models/HelpOrders';
import Student from '../models/Student';

class HelpOrdersController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const student = await Student.findByPk(req.params.stud_id);
    if (!student) {
      return res.status(401).json({
        error: 'Somente alunos credenciados podem criar pedidos de ajuda',
      });
    }
    const helOrder = await HelpOrders.findAll({
      where: { student_id: req.params.stud_id },
      limit: 5,
      offset: (page - 1) * 5,
      order: [['id', 'desc']],
    });

    return res.json(helOrder);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Falha na validação dos dados, confira todos os campos',
      });
    }

    const student = await Student.findByPk(req.params.stud_id);
    if (!student) {
      return res.status(401).json({
        error: 'Somente alunos credenciado podem criar pedidos de ajuda',
      });
    }
    const helpOrder = await HelpOrders.create({
      student_id: req.params.stud_id,
      question: req.body.question,
    });

    return res.json(helpOrder);
  }
}

export default new HelpOrdersController();
