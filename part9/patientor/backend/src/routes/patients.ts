import { NonSensitivePatient, NewPatient } from "../types";
import { Response } from 'express';

import patientsService from "../services/patientsService";
import {validateNewPatient} from '../utils';

import express from 'express';
const router = express.Router();

router.get('/', (_req, res:Response<NonSensitivePatient[]>) => {
    res.send(patientsService.getAll());
});

router.post('/', (req, res) => {
    try {
        const patient: NewPatient = validateNewPatient(req.body);
        const result = patientsService.addPatient(patient);
        res.json(result);
    }
    catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error)
            errorMessage += ' Error: ' + error.message;
        res.status(400).send(errorMessage);
    }
});

export default router;