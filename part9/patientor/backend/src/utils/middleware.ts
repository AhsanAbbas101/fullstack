import { NextFunction, Request, Response } from 'express';


import { PatientSchema } from './index';
export const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        PatientSchema.omit({id: true}).parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

import { z } from 'zod';
export const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
    }
    else {
        next(error);
    }
};