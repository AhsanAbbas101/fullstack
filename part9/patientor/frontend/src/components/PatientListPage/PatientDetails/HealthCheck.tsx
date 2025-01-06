import { Typography } from "@mui/material";
import { HealthCheckEntry } from "../../../types";

import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
    entry: HealthCheckEntry
}

const HealthCheck = ({ entry }: Props) => {
    
    const colors = ['green', 'yellow', 'orange', 'red'];

    return (<>
        <Typography>{entry.date} <MedicalServicesIcon /> </Typography>
        <Typography>{entry.description}</Typography>
        <FavoriteIcon style={{ color: colors[entry.healthCheckRating] }} />
        <Typography>Diagnosed by: { entry.specialist }</Typography>
    </>);
};

export default HealthCheck;
