import express from 'express'
const app = express()

import calculateBmi from './bmiCalculator'

app.get('/hello', (_req, res) => {
    res.send(`Hello Full Stack!`)
})

app.get('/bmi', (req, res) => {
    console.log('/bim',req.query)

    try {
        const height = Number(req.query.height)
        const weight = Number(req.query.weight)
        if (isNaN(height) || isNaN(weight))
            throw new Error('malformatted parameters')

        const result = calculateBmi(height, weight)
        res.json({
            weight: weight,
            height: height,
            bmi: result
        })

    }
    catch (error: unknown)
    {
        if (error instanceof Error)
        {
            
            res.json({ error: error.message })
        }
        
    }
        
})

app.get('/', (_req, res) => {
    res.send(`Available endpoint /hello /bmi`)
})


const PORT = 4000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
})