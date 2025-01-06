import { useEffect, useState } from "react";
import patients from "../../services/patients";
import { Diagnosis, Gender, Patient } from "../../types";
import { useParams } from "react-router-dom";

import { Container, Typography } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';

interface Props {
    diagnoses: Diagnosis[]
}

const PatientDetails = ({diagnoses} : Props) => {

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

    const getDiagnosisDesc = (code: string): string => {
        const diagnosis = diagnoses.find(d => d.code === code);
        return diagnosis ? diagnosis.name : '';
    };
    
    return (
        <div>
            <Container style={{marginTop:'1em'}}>
                <Typography variant="h4">{patient.name} {icon}</Typography>
                <Typography variant="h6">ssn: {patient.ssn}</Typography>
                <Typography variant="h6">occupation: {patient.occupation}</Typography>
                <Typography variant="h6">DOB: {patient.dateOfBirth}</Typography>
            </Container>
            <br/>
            <Container>
                <Typography variant="h5"><strong>entries</strong></Typography>
                {patient.entries.map(entry => (
                    <Container key={entry.id}>
                        <Typography component="p">{entry.date}: {entry.description}</Typography>
                        <ul>
                            {entry.diagnosisCodes && entry.diagnosisCodes.map((code,i) => (
                                <li key={i}>{code} { getDiagnosisDesc(code) }</li>
                            ))}
                        </ul>
                    </Container>
                ))}
            </Container>
        </div>
    );
};

export default PatientDetails;