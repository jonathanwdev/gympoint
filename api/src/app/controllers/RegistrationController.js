import { addMonths, parseISO } from 'date-fns';
import Registration from '../models/Registration';
import User from '../models/User';
import Plan from '../models/Plan';
import Student from '../models/Student';

import RegistrationMail from '../jobs/RegistrationMail';
import Queue from '../../lib/Queue';

class RegistrationController {
  async index(req, res) {
    const adm = await User.findByPk(req.userId);
    if (!adm) {
      return res
        .status(401)
        .json({ error: 'Somente administradores podem matricular alunos' });
    }
    const registrations = await Registration.findAll();
    return res.json(registrations);
  }

  async store(req, res) {
    const { student_id, plan_id, start_date } = req.body;

    const adm = await User.findByPk(req.userId);
    if (!adm) {
      return res
        .status(401)
        .json({ error: 'Somente administradores podem matricular alunos' });
    }

    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(404).json({ error: 'Esse estudante não existe' });
    }

    const plan = await Plan.findByPk(plan_id);
    if (!plan) {
      return res.status(404).json({ error: 'Este plano não existe' });
    }

    const parsedDate = parseISO(start_date);
    if (parsedDate < new Date()) {
      return res
        .status(401)
        .json({ error: 'Datas passadas não são permitidas' });
    }

    const registrationExists = await Registration.findOne({
      where: { student_id },
    });

    if (registrationExists) {
      return res
        .status(401)
        .json({ error: 'Este estudante ja possui matricula ativa' });
    }

    const finishedRegist = addMonths(parsedDate, plan.duration);

    const registration = await Registration.create({
      student_id,
      price: plan.price * plan.duration,
      plan_id,
      start_date: parsedDate,
      end_date: finishedRegist,
    });

    await Queue.add(RegistrationMail.key, {
      student,
      finishedRegist,
      plan,
    });

    return res.json(registration);
  }

  async update(req, res) {
    const { student_id, plan_id, start_date } = req.body;
    const adm = await User.findByPk(req.userId);

    if (!adm) {
      return res
        .status(401)
        .json({ error: 'Somente administradores podem matricular alunos' });
    }
    const student = await Student.findByPk(student_id);
    if (!student) {
      return res.status(404).json({ error: 'Esse estudante não existe' });
    }
    const plan = await Plan.findByPk(plan_id);
    if (!plan) {
      return res.status(404).json({ error: 'Este plano não existe' });
    }

    const registration = await Registration.findByPk(req.params.regis_id);
    if (!registration) {
      return res.status(404).json({ error: 'Essa matricula não existe' });
    }
    const parsedDate = parseISO(start_date);
    const finishedRegist = addMonths(parsedDate, plan.duration);

    await registration.update({
      student_id,
      price: plan.price * plan.duration,
      plan_id,
      start_date: parsedDate,
      end_date: finishedRegist,
    });

    return res.json(registration);
  }

  async delete(req, res) {
    const adm = await User.findByPk(req.userId);

    if (!adm) {
      return res
        .status(401)
        .json({ error: 'Somente administradores podem matricular alunos' });
    }
    const registration = await Registration.findByPk(req.params.regis_id, {
      include: [
        {
          model: Student,
          attributes: ['id', 'name'],
        },
        {
          model: Plan,
          attributes: ['id', 'title'],
        },
      ],
    });
    if (!registration) {
      return res.status(404).json({ error: 'Essa matricula não existe' });
    }

    await registration.destroy();
    return res.send();
  }
}

export default new RegistrationController();
