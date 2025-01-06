import { OccupationalHealthcareEntry } from "../../../types";

import { Typography } from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';

interface Props {
    entry: OccupationalHealthcareEntry
}


const OccupationalHealthcare = ({ entry }: Props) => {
    return (<>
        <Typography>{entry.date} <WorkIcon /> {entry.employerName} </Typography>
        <Typography>{entry.description}</Typography>
        {entry.sickLeave && (
            <Typography>Sick Leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</Typography>
        )}
        <Typography>Diagnosed by: { entry.specialist }</Typography>
    </>);
};

export default OccupationalHealthcare;
