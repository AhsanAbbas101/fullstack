import { NonSensitivePatient } from "../types";
import { Response } from 'express';

import patientsService from "../services/patientsService";

import express from 'express';
const router = express.Router();

router.get('/', (_req, res:Response<NonSensitivePatient[]>) => {
    res.send(patientsService.getAll());
});

export default router;