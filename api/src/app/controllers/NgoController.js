const connection = require('../../database/connection');
const generateUniqueId = require('../../utils/generateUniqueId');

class NgosController {
  async store(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;

    const id = generateUniqueId();

    await connection('ngos').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    return res.status(201).json({ id });
  }

  async index(req, res) {
    const ngos = await connection('ngos').select('*');

    return res.json(ngos);
  }
}

module.exports = new NgosController();
