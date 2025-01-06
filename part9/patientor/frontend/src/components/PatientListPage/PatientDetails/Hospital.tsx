import { HospitalEntry } from "../../../types";

import { Typography } from "@mui/material";
import HealingIcon from '@mui/icons-material/Healing';

interface Props {
    entry: HospitalEntry
}


const Hospital = ({entry}: Props) => {
    return (<>
        <Typography><strong>{entry.date}</strong> <HealingIcon /></Typography>
        <Typography>{entry.description}</Typography>
        <Typography><strong>Discharged on:</strong> {entry.discharge.date}, <strong>criteria:</strong> { entry.discharge.criteria }</Typography>
        <Typography><strong>Diagnosed by:</strong> { entry.specialist }</Typography>
    </>);
};

export default Hospital;
