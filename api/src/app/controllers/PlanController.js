import * as Yup from 'yup';
import Plan from '../models/Plan';
import User from '../models/User';

class PlanController {
  async index(req, res) {
    const adm = await User.findByPk(req.userId);
    if (!adm) {
      return res
        .status(401)
        .json({ error: 'Somente administradores podem criar novos planos' });
    }
    const plans = await Plan.findAll();
    return res.json(plans);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Falha na validação dos dados, confira todos os campos',
      });
    }

    const { title } = req.body;
    const adm = await User.findByPk(req.userId);
    if (!adm) {
      return res
        .status(401)
        .json({ error: 'Somente administradores podem criar novos planos' });
    }
    const planExists = await Plan.findOne({ where: { title } });

    if (planExists) {
      return res
        .status(401)
        .json({ error: ' Este plano já existe no sistema' });
    }
    const { id, price, duration } = await Plan.create(req.body);

    return res.json({ id, title, price, duration });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string(),
      duration: Yup.number(),
      price: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Falha na validação dos dados, confira todos os campos',
      });
    }

    const { title } = req.body;

    const adm = await User.findByPk(req.userId);
    if (!adm) {
      return res
        .status(401)
        .json({ error: 'Somente administradores podem criar novos planos' });
    }
    const plans = await Plan.findByPk(req.params.id);

    if (!plans) {
      return res.status(404).json({ error: 'Este plano não existe' });
    }
    if (plans.title !== title) {
      const planExists = await Plan.findOne({ where: { title } });
      if (planExists) {
        return res.status(400).json({ error: 'Esse plano já existe' });
      }
    }

    await plans.update(req.body);
    return res.json(plans);
  }

  async delete(req, res) {
    const adm = await User.findByPk(req.userId);
    if (!adm) {
      return res
        .status(401)
        .json({ error: 'Somente administradores podem criar novos planos' });
    }
    const plans = await Plan.findByPk(req.params.id);

    if (!plans) {
      return res.status(404).json({ error: 'Este plano não existe' });
    }
    await plans.destroy();
    return res.send();
  }
}

export default new PlanController();
