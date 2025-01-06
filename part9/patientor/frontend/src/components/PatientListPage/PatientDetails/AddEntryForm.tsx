import { Box, SelectChangeEvent, Stack, TextField, Typography, Select, MenuItem, InputLabel, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio, Accordion, AccordionDetails, AccordionSummary, Button } from "@mui/material";

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AddIcon from '@mui/icons-material/Add';

import { useState } from "react";
import { Diagnosis, EntryWithoutId, HealthCheckRating } from "../../../types";

interface Props {
    diagnoses: Diagnosis[]
    addEntry: (entry: EntryWithoutId) => void
}

const AddEntryForm = ({ diagnoses, addEntry }: Props) => {

    const [description, setDesc] = useState<string>('');
    const [date, setDate] = useState<string>('');
    const [specialist, setSpecialist] = useState<string>('');
    const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
    const [type, setType] = useState<string>('HealthCheck');

    const [healthRating, setHealthRating] = useState<number>(0);

    const [employerName, setEmployerName] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');

    const [dischargeDate, setDischargeDate] = useState<string>('');
    const [criteria, setCriteria] = useState<string>('');


    const handleDisgonsisCodeChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
        const {
            target: { value },
        } = event;

        setDiagnosisCodes(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const diagnosesSelectStyle = (code: string) => {
        return {
            backgroundColor: diagnosisCodes.includes(code) ? 'lightgray' : 'white',
            fontWeight: diagnosisCodes.includes(code) ? 'bold' : 'initial'
        };
    };

    const onAddClick = () => {
        //type EntryType = "HealthCheck" | "OccupationalHealthcare" | "Hospital";
        let entry;
        if (type === 'HealthCheck')
            entry = {
                type: "HealthCheck",
                description, date, specialist, diagnosisCodes,
                healthCheckRating: healthRating,
            };
        else if (type === 'OccupationalHealthcare')
            entry = {
                type: "OccupationalHealthcare",
                description, date, specialist, diagnosisCodes,
                employerName, sickLeave: {
                    startDate, endDate
                }
            };
        else if (type === 'Hospital')
            entry = {
                type: "Hospital",
                description, date, specialist, diagnosisCodes,
                discharge: {
                    date: dischargeDate,
                    criteria
                }
            };
        else
            throw new Error(`Unhandled entry type occured. ${type}`);

        addEntry(entry as EntryWithoutId);
    };

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ArrowDropDownIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
            >
                <AddIcon />
                <Typography component="span"><strong>New Entry Form</strong></Typography>

            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{ border: 1, borderStyle: "dashed", padding: 2 }}>
                    <Stack >

                        {/* Base Entry */}
                        <InputLabel id="description-label">Description</InputLabel>
                        <TextField
                            required
                            variant="standard"
                            value={description}
                            onChange={({ target }) => setDesc(target.value)}
                        />

                        <InputLabel id="date-label">Date</InputLabel>
                        <TextField
                            type="date"
                            variant="standard"
                            value={date}
                            onChange={({ target }) => setDate(target.value)}
                        />

                        <InputLabel id="specialist-label">Specialist</InputLabel>
                        <TextField
                            variant="standard"
                            value={specialist}
                            onChange={({ target }) => setSpecialist(target.value)}
                        />

                        <InputLabel id="multiple-diagnosisCodes-label">Diagnosis Codes</InputLabel>
                        <Select
                            variant="standard"
                            labelId="multiple-diagnosisCodes-label"
                            multiple
                            value={diagnosisCodes}
                            onChange={handleDisgonsisCodeChange}
                        >
                            {diagnoses.map(d => (
                                <MenuItem
                                    key={d.code}
                                    value={d.code}
                                    style={diagnosesSelectStyle(d.code)}
                                >
                                    {d.code}
                                </MenuItem>
                            ))}
                        </Select>

                        {/* Extended Entry Selection */}
                        <FormControl>
                            <FormLabel id="entry-selection-group-label">Type</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="entry-selection-group-label"
                                name="entry-selection-row-radio-buttons-group"
                                value={type}
                                onChange={({ target }) => setType(target.value)}
                            >
                                <FormControlLabel value="HealthCheck" control={<Radio />} label="Health Check" />
                                <FormControlLabel value="OccupationalHealthcare" control={<Radio />} label="Occupational Healthcare" />
                                <FormControlLabel value="Hospital" control={<Radio />} label="Hospital" />
                            </RadioGroup>
                        </FormControl>

                        {/* HealthCheckEntry Selection */}
                        {type === 'HealthCheck' && (
                            <FormControl>
                                <FormLabel id="health-rating-group-label">Health Rating</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="health-rating-group-label"
                                    name="health-rating-row-radio-buttons-group"
                                    value={healthRating}
                                    onChange={({ target }) => setHealthRating(Number(target.value))}
                                >
                                    <FormControlLabel value={HealthCheckRating.Healthy} control={<Radio />} label="Healthy" />
                                    <FormControlLabel value={HealthCheckRating.LowRisk} control={<Radio />} label="Low Risk" />
                                    <FormControlLabel value={HealthCheckRating.HighRisk} control={<Radio />} label="High Risk" />
                                    <FormControlLabel value={HealthCheckRating.CriticalRisk} control={<Radio />} label="Critical Risk" />
                                </RadioGroup>
                            </FormControl>
                        )}

                        {/* OccupationalHealthcareEntry Selection */}
                        {type === 'OccupationalHealthcare' && (
                            <>
                                <InputLabel id="employer-name-label">Employer Name</InputLabel>
                                <TextField
                                    variant="standard"
                                    type="text"
                                    value={employerName}
                                    onChange={({ target }) => setEmployerName(target.value)}
                                />


                                <InputLabel id="start-date-label">Start Date</InputLabel>
                                <TextField
                                    fullWidth
                                    type="date"
                                    variant="standard"
                                    value={startDate}
                                    onChange={({ target }) => setStartDate(target.value)}
                                />
                                <InputLabel id="end-date-label">End Date</InputLabel>
                                <TextField
                                    fullWidth
                                    type="date"
                                    variant="standard"
                                    value={endDate}
                                    onChange={({ target }) => setEndDate(target.value)}
                                />
                            </>
                        )}

                        {/* HospitalEntry Selection */}
                        {type === 'Hospital' && (
                            <>
                                <InputLabel id="discharge-date-label">Discharge Date</InputLabel>
                                <TextField
                                    fullWidth
                                    type="date"
                                    variant="standard"
                                    value={dischargeDate}
                                    onChange={({ target }) => setDischargeDate(target.value)}
                                />

                                <InputLabel id="discharge-criteria-label">Discharge Criteria</InputLabel>
                                <TextField
                                    variant="standard"
                                    type="text"
                                    value={criteria}
                                    onChange={({ target }) => setCriteria(target.value)}
                                />
                            </>

                        )}

                        <Button variant="contained" onClick={onAddClick}>Add Entry</Button>
                    </Stack>
                </Box>
            </AccordionDetails>
        </Accordion>
    );
};

export default AddEntryForm;