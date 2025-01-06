import { useEffect, useState } from "react";
import patients from "../../../services/patients";
import { Diagnosis, Entry, Gender, Patient } from "../../../types";
import { useParams } from "react-router-dom";


import { Container, Typography, Stack, Box } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import Hospital from "./Hospital";
import OccupationalHealthcare from "./OccupationalHealthcare";
import HealthCheck from "./HealthCheck";

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

    const entryDetails = (entry: Entry) => {
        
        let data = entry;
        if (entry.diagnosisCodes)
        {
            const diagnoses = entry.diagnosisCodes.map(e => getDiagnosisDesc(e));
            data = { ...entry, diagnosisCodes: diagnoses };
        }
    
        switch (data.type) {
            case "Hospital":
                return <Hospital entry={data} />;
            case "OccupationalHealthcare":
                return <OccupationalHealthcare entry={data}/>;
            case "HealthCheck":
                return <HealthCheck entry={data}/>;
            default:
                return null;
        }
    };
    
    return (
        <div>
            <Container style={{marginTop:'1em'}}>
                <Typography variant="h4">{patient.name} {icon}</Typography>
                <Typography>ssn: {patient.ssn}</Typography>
                <Typography>occupation: {patient.occupation}</Typography>
                <Typography>DOB: {patient.dateOfBirth}</Typography>
            </Container>
            <br />
            {
                patient.entries.length > 0 && (
                    <Container>
                        <Typography variant="h5"><strong>entries</strong></Typography>
                        <Stack spacing={2}>
                            {patient.entries.map(entry => (<Box key={entry.id} sx={{ width: '100%', border: 1, borderRadius: 1, padding: 1}}>{  entryDetails(entry)}</Box>))}
                        </Stack>
                    </Container>
                )
            }
            
        </div>
    );
};

export default PatientDetails;