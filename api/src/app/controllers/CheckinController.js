import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import { Op } from 'sequelize';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Cadastro não encontrado' });
    }
    const { page = 1 } = req.query;
    const checkins = await Checkin.findAll({
      where: { student_id: req.params.id },
      order: [['createdAt', 'desc']],
      limit: 10,
      offset: (page - 1) * 10,
    });

    return res.json(checkins);
  }

  async store(req, res) {
    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Cadastro não encontrado' });
    }
    const startedWeek = startOfWeek(new Date());
    const endWeek = endOfWeek(new Date());

    const checkins = await Checkin.findAll({
      where: {
        student_id: req.params.id,
        created_at: {
          [Op.between]: [startedWeek, endWeek],
        },
      },
    });
    if (checkins && checkins.length >= 5) {
      return res
        .status(401)
        .json({ error: 'Seu plano só permite 5 checkins por semana :(' });
    }
    const currentlyCheckin = await Checkin.create({
      student_id: req.params.id,
    });

    return res.json(currentlyCheckin);
  }
}
export default new CheckinController();
