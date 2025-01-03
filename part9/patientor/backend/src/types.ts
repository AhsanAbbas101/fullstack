
export interface Diagnosis {
    code: string,
    name: string,
    latin?: string
}

export enum Gender {
    male = "male",
    female = "female",
    other = "other"
}

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string
}

export type NonSensitivePatient = Omit<Patient, "ssn">;
export type NewPatient = Omit<Patient, 'id'>;