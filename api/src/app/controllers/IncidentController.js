const connection = require('../../database/connection');

class IncidentController {
  async index(req, res) {
    const { page = 1, per_page = 5 } = req.query;

    const [count] = await connection('incidents').count();

    const incidents = await connection('incidents')
      .join('ngos', 'ngos.id', '=', 'incidents.ngo_id')
      .limit(per_page)
      .offset((page - 1) * per_page)
      .select([
        'incidents.*',
        'ngos.name',
        'ngos.email',
        'ngos.whatsapp',
        'ngos.city',
        'ngos.uf',
      ]);

    res.header('X-Total-Count', count['count(*)']);

    return res.json(incidents);
  }

  async store(req, res) {
    const { title, description, value } = req.body;
    const ngo_id = req.headers.authorization;

    if (!ngo_id)
      return res.status(422).json({ error: 'NGO id was not provided' });

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ngo_id,
    });

    return res.status(201).json({ id });
  }

  async destroy(req, res) {
    const { id } = req.params;
    const ngo_id = req.headers.authorization;

    if (!ngo_id)
      return res.status(400).json({ error: 'NGO id was not provided' });

    const incident = await connection('incidents')
      .where('id', id)
      .select('ngo_id')
      .first();

    if (!incident) return res.status(404).json({ error: 'NGO not found' });

    if (ngo_id !== incident.ngo_id)
      return res.status(401).json({ error: 'Operation not permitted' });

    await connection('incidents').where('id', id).delete();

    return res.status(204).send();
  }
}

module.exports = new IncidentController();
