import { NonSensitivePatient, NewPatient, Patient } from "../types";
import { Response, Request } from 'express';

import patientsService from "../services/patientsService";

import { errorMiddleware, newPatientParser } from '../utils/middleware';

import express from 'express';
const router = express.Router();

router.get('/', (_req, res:Response<NonSensitivePatient[]>) => {
    res.send(patientsService.getAll());
});

router.post('/', newPatientParser, (req: Request<unknown,unknown,NewPatient>, res: Response<Patient>) => {
    const patient = patientsService.addPatient(req.body);
    res.json(patient);
});

router.get('/:id', (req, res:Response<Patient|string>) => {
    const patient = patientsService.findById(req.params.id);
    if (patient)
        res.send(patient);
    else
        res.sendStatus(404);
});

router.use(errorMiddleware);

export default router;