import { z } from 'zod';
import { NewPatient, Gender } from '../types';

const isString = (object: unknown): object is string => {
    return typeof object === 'string' || object instanceof String;
};

const isDate = (object: string): boolean => {
    return Boolean(Date.parse(object));
};

const isSSN = (object: string): boolean => {
    // format ######-####
    if (object.length < 8 || object.length > 11)
        return false;
    if (object[6] != '-')
        return false;
    return true;
};

const isGender = (object: string): object is Gender => {
    return Object.values(Gender).map(g => g.toString()).includes(object);
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name))
        throw new Error(`Incorrect or missing name: ${name}`);

    return name;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date))
        throw new Error(`Incorrect or missing date: ${date}`);

    return date;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation))
        throw new Error(`Incorrect or missing occupation: ${occupation}`);

    return occupation;
};

const parseSSN = (ssn: unknown): string => {
    if (!ssn || !isString(ssn) || !isSSN(ssn))
        throw new Error(`Incorrect or missing ssn: ${ssn}`);
    
    return ssn;
};

const parseGender = (gender: unknown) : Gender=> {
    if (!gender || !isString(gender) || !isGender(gender))
        throw new Error(`Incorrect or missing gender: ${gender}`);

    return gender;
};

export const validateNewPatient = (object: unknown): NewPatient => {
    
    // validate if type is object and exists
    if (!object || typeof object !== 'object')
        throw new Error('Incorrect or missing data');

    // validate if properties exist in object
    if ("name" in object &&
        "dateOfBirth" in object &&
        "ssn" in object &&
        "gender" in object &&
        "occupation" in object) {
        return {
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSSN(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: []
        };
    }

    throw new Error('Incorrect or missing data');
};

export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string().min(8).max(11),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
    entries: z.optional(z.array(z.object({})))  // edit this later
});
