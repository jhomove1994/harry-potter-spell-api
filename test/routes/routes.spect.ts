import route from "../../src/routes/route";
import bodyParser from 'body-parser';
import express from 'express';
import request from 'supertest';

const app = express();
app.use(bodyParser.json());
app.use(route);

describe('Routes', () => {
  it('should response GET to "/health" route', async () => {
    const response = await request(app).get('/').send();
    expect(response.status).toBe(200);
  });
  it('should response GET to "/harrypotter/Spells" route', async () => {
    const response = await request(app).get('/harrypotter/Spells?Type=Charm&&light=Blue').send();
    expect(response.status).toBe(200);
  });
  it('should response POST to "/harrypotter/Spells" route', async () => {
    const response = await request(app).post('/harrypotter/Spells').send({
      name: "Lumos",
      incantation: "Lumos",
      effect: "Illuminates the wand tip",
      canBeVerbal: true,
      type: "Charm",
      light: "Blue"
    });
    expect(response.status).toBe(201);
  });
});
