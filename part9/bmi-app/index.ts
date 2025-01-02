import express from 'express';

const app = express();
app.use(express.json());
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

app.get('/hello', (_req, res) => {
    res.send(`Hello Full Stack!`);
});

app.get('/bmi', (req, res) => {
    console.log('/bmi',req.query);

    try {
        const height = Number(req.query.height);
        const weight = Number(req.query.weight);
        if (isNaN(height) || isNaN(weight))
            throw new Error('malformatted parameters');

        const result = calculateBmi(height, weight);
        res.json({
            weight: weight,
            height: height,
            bmi: result
        });

    }
    catch (error: unknown)
    {
        if (error instanceof Error)
        { 
            res.json({ error: error.message });
        }
        
    }
        
});

app.post('/exercises', (req, res) => {
    console.log('/exercises', req.body);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    
    try {
        if (!daily_exercises || !target)
            throw new Error(`parameters missing`);
        if (isNaN(Number(target)))
            throw new Error(`malformatted parameters`);
        if (!(daily_exercises instanceof Array))
            throw new Error(`malformatted parameters`);
        const hours: number[] = [];
        (daily_exercises as Array<object>).map((arg) => {
            const num = Number(arg);
            if (isNaN(num) || !isNaN(num) && num < 0)
                throw new Error(`malformatted parameters`);
            hours.push(num);
        });
        
        res.json(calculateExercises(hours, Number(target)));
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            res.json({ error: error.message });
        }
    }

});

app.get('/', (_req, res) => {
    res.send(`Available endpoint /hello /bmi /exercises`);
});


const PORT = 4000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
});