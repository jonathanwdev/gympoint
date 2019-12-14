import User from '../models/User';
import Student from '../models/Student';
import HelpOrders from '../models/HelpOrders';

import AnswerMail from '../jobs/AnswerMail';
import Queue from '../../lib/Queue';

class AnswerController {
  async index(req, res) {
    const adm = await User.findByPk(req.userId);
    if (!adm) {
      return res.status(401).json({
        error: 'Somente administradores podem ter acesso a esse local.',
      });
    }
    const helpOrders = await HelpOrders.findAll({
      where: { answer: null, answer_at: null },
      attributes: ['id', 'question'],
      include: [
        {
          model: Student,
          attributes: ['id', 'name', 'email'],
        },
      ],
    });
    return res.json(helpOrders);
  }

  async store(req, res) {
    const adm = await User.findByPk(req.userId);
    if (!adm) {
      return res.status(401).json({
        error: 'Somente administradores podem ter acesso a esse local.',
      });
    }
    const helpOrders = await HelpOrders.findByPk(req.params.help_id, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [{ model: Student, attributes: ['id', 'name', 'email'] }],
    });

    if (!helpOrders) {
      return res.status(401).json({
        error: 'Este pedido não existe',
      });
    }
    if (helpOrders.answer) {
      return res.status(401).json({
        error: 'Este pedido já foi respondido',
      });
    }

    await helpOrders.update({
      answer: req.body.answer,
      answer_at: new Date(),
    });

    await Queue.add(AnswerMail.key, {
      helpOrders,
      answer: req.body.answer,
    });

    return res.json(helpOrders);
  }
}

export default new AnswerController();
