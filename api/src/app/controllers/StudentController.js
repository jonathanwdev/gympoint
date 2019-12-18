import * as Yup from 'yup';
import { Op } from 'sequelize';
import Student from '../models/Student';
import User from '../models/User';

class StudentController {
  async show(req, res) {
    const adm = await User.findByPk(req.userId);
    if (!adm) {
      return res
        .status(401)
        .json({ error: 'Somente administradores tem acesso a essa função' });
    }
    const student = await Student.findByPk(req.params.stude_id);
    if (!student) {
      return res.status(404).json({ error: 'Estudante não encontrado' });
    }
    return res.json(student);
  }

  async index(req, res) {
    const adm = await User.findByPk(req.userId);
    if (!adm) {
      return res
        .status(401)
        .json({ error: 'Somente administradores tem acesso a essa função' });
    }
    const { username = '', page = 1 } = req.query;

    const students = await Student.findAndCountAll({
      where: {
        name: {
          [Op.like]: `%${username}%`,
        },
      },
      limit: 10,
      offset: (page - 1) * 10,
      order: ['name'],
    });

    return res.json(students);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Falha na validação dos dados, confira todos os campos',
      });
    }

    const { email } = req.body;

    const adm = await User.findOne({ where: { id: req.userId } });

    if (!adm) {
      return res.status(401).json({
        error: 'Somente administradores credenciados podem cadastrar alunos',
      });
    }

    const studentExists = await Student.findOne({ where: { email } });
    if (studentExists) {
      return res
        .status(400)
        .json({ error: 'Esse aluno já está cadastrado no sistema' });
    }

    const { id, name, age, weight, height } = await Student.create(req.body);
    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      age: Yup.number(),
      weight: Yup.number(),
      height: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Falha na validação dos dados, confira todos os campos',
      });
    }

    const { email } = req.body;

    const adm = await User.findOne({ where: { id: req.userId } });

    if (!adm) {
      return res.status(401).json({
        error: 'Somente administradores credenciados podem cadastrar alunos',
      });
    }

    const student = await Student.findByPk(req.params.stud_id);
    if (!student) {
      return res
        .status(404)
        .json({ error: 'Esse aluno não existe no sistema' });
    }

    if (student.email !== email) {
      const studentExists = await Student.findOne({ where: { email } });
      if (studentExists) {
        return res
          .status(400)
          .json({ error: 'Esse aluno já está cadastrado no sistema' });
      }
    }
    await student.update(req.body);

    return res.json(student);
  }

  async delete(req, res) {
    const adm = await User.findOne({ where: { id: req.userId } });

    if (!adm) {
      return res.status(401).json({
        error: 'Somente administradores credenciados podem cadastrar alunos',
      });
    }

    const student = await Student.findByPk(req.params.stud_id);
    if (!student) {
      return res
        .status(404)
        .json({ error: 'Esse aluno não existe no sistema' });
    }
    await student.destroy();
    return res.send();
  }
}

export default new StudentController();
