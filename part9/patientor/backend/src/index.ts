import express from 'express';
import cors from 'cors';

import DiagnosisRoute from './routes/diagnoses';
import PatientsRoute from './routes/patients';


const app = express();
app.use(cors());
app.use(express.json());


app.get('/api/ping', (_req, res) => {
    res.send('pong');
});

app.use('/api/diagnoses', DiagnosisRoute);
app.use('/api/patients', PatientsRoute);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running at Port ${PORT}`);
});


