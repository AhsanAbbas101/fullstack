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

router.use(errorMiddleware);

export default router;