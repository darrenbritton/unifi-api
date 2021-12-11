import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json'

import { getUnifiDeviceData } from './unifi.js';


// simple logger for this router's requests
// all requests to this router will first hit this middleware

const app = express();
const router = express.Router();

const port = process.env.PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', router);


router.use(function(req, res, next) {
  console.log(`${req.method}: ${req.url}/${req.path}`);
  next();
});

router.get('/', async (req, res) => {
  const data = await getUnifiDeviceData();
  res.json(data);
});

router.get('/device/ids', async ( req, res) => {
  const { data } = await getUnifiDeviceData();
  const ids = data.map(({ _id, name }) => ({ [_id]: name}));
  res.json({ ids });
});

router.get('/device/:deviceId', async (req, res) => {
  const { data } = await getUnifiDeviceData();
  const device = data.find(device => device._id === req.params.deviceId);
  res.json(device);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});