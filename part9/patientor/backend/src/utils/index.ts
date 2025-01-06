import { z } from 'zod';
import { Gender, HealthCheckRating } from '../types';


export const BaseEntrySchema = z.object({
    id: z.string(),
    description: z.string(),
    date: z.string().date(),
    specialist: z.string(),
    diagnosisCodes: z.optional(z.array(z.string())) //how to ensure diagnosis codes?
}).strict();

export const HealthCheckEntrySchema = BaseEntrySchema.extend({
    type: z.literal('HealthCheck'),
    healthCheckRating: z.nativeEnum(HealthCheckRating)
});

export const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
    type: z.literal('OccupationalHealthcare'),
    employerName: z.string(),
    sickLeave: z.optional(z.object({
        startDate: z.string().date(),
        endDate: z.string().date()
    }).strict())
});

export const HospitalEntrySchema = BaseEntrySchema.extend({
    type: z.literal('Hospital'),
    discharge: z.object({
        date: z.string().date(),
        criteria: z.string()
    }).strict()
});


export const NewEntrySchema = z.discriminatedUnion('type', [
    HealthCheckEntrySchema.omit({ id: true }),
    OccupationalHealthcareEntrySchema.omit({ id: true }),
    HospitalEntrySchema.omit({ id: true }),
]);

export const PatientSchema = z.object({
    id: z.string(),
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string().min(8).max(11),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
    entries: z.array(z.discriminatedUnion('type',[HospitalEntrySchema,OccupationalHealthcareEntrySchema,HealthCheckEntrySchema]))  
}).strict();
