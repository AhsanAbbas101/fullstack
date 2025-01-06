import { NewPatient, NonSensitivePatient, Patient } from "../types";

import data from "../../data/patients";

import { v1 as uuid } from 'uuid';


const getAll = () : NonSensitivePatient[] => {
    return data.map(p => ({
        id: p.id,
        name: p.name,
        dateOfBirth: p.dateOfBirth,
        gender: p.gender,
        occupation: p.occupation,
    }));
};

const addPatient = (object: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...object,
    };
    data.push(newPatient);
    return newPatient;
};

const findById = (id: string): Patient | undefined => {
    return data.find(p => p.id === id);
};

export default { getAll, addPatient, findById };