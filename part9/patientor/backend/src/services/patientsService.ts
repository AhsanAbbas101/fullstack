import { NonSensitivePatient } from "../types";

import data from "../../data/patients";

const getAll = () : NonSensitivePatient[] => {
    return data.map(p => ({
        id: p.id,
        name: p.name,
        dateOfBirth: p.dateOfBirth,
        gender: p.gender,
        occupation: p.occupation,
    }));
};

export default { getAll };