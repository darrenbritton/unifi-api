import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

import { getUnifiDeviceData } from './unifi.js';

const app = express();

const port = process.env.PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', async (req, res) => {
  const data = await getUnifiDeviceData();
  res.json(data);
});

app.get('/device/:deviceId', async (req, res) => {
  const { data } = await getUnifiDeviceData();
  const device = data.find(device => device._id === req.params.deviceId);
  res.json(device);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});