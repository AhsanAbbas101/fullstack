import { NextFunction, Request, Response } from 'express';


import { PatientSchema, NewEntrySchema } from './index';
export const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        PatientSchema.omit({id: true}).parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

export const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewEntrySchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

import { z } from 'zod';
import { fromError } from 'zod-validation-error';
export const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: fromError(error).toString() });
    }
    else {
        next(error);
    }
};