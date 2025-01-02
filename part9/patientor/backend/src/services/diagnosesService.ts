import { Diagnosis } from "../types";

import data from "../../data/diagnoses";

const getAll = () : Diagnosis[] => {
    return data;
};

export default { getAll };