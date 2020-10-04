/* eslint-disable import/no-unresolved */
const request = require('supertest');
const connection = require('../../src/database/connection');
const app = require('../../src/index.js');

describe('NGO', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new NGO', async () => {
    const response = await request(app).post('/ngos').send({
      name: 'Make-A-Wish Foundation',
      whatsapp: '11555555555',
      email: 'makeawish@example.com.br',
      city: 'São Paulo',
      uf: 'SP',
    });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });
});
