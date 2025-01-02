import { Diagnosis } from "../types";
import { Response } from 'express';

import diagnosesService from "../services/diagnosesService";

import express from 'express';
const router = express.Router();

router.get('/', (_req, res:Response<Diagnosis[]>) => {
    res.send(diagnosesService.getAll());
});

export default router;