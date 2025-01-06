import { useEffect, useState } from "react";
import patients from "../../services/patients";
import { Gender, Patient } from "../../types";
import { useParams } from "react-router-dom";

import { Container, Typography } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';


const PatientDetails = () => {

    const id = useParams().id;

    const [patient, setPatient] = useState<Patient|undefined>(undefined);
    useEffect(() => {

        const fetchPatient = async () => {
            if (!id) return;
            
            const patient = await patients.getOne(id);
            setPatient(patient);
        
        };

        void fetchPatient();
    }, [id]);

    if (!patient)
        return null;

    const icon = patient.gender === Gender.Female
        ? (<FemaleIcon />)
        : patient.gender === Gender.Male ? <MaleIcon />
            : <></>;

    return (
        <div>
            <Container style={{marginTop:'1em'}}>
                <Typography variant="h4">{patient.name} {icon}</Typography>
                <Typography variant="h6">ssn: {patient.ssn}</Typography>
                <Typography variant="h6">occupation: {patient.occupation}</Typography>
                <Typography variant="h6">DOB: {patient.dateOfBirth}</Typography>
            </Container>
        </div>
    );
};

export default PatientDetails;