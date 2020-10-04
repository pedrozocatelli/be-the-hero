const connection = require('../../database/connection');

class SessionController {
  async store(req, res) {
    const { id } = req.body;

    const ngo = await connection('ngos').where('id', id).select('name').first();

    if (!ngo) return res.status(400).json({ error: 'NGO does not exists' });

    return res.json(ngo);
  }
}

module.exports = new SessionController();
