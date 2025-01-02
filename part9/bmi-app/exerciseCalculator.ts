
export interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (hours: number[], target: number): Result => {

    const getRating = (avg: number, target: number): number => {
        if (target <= 0 )
            return  3; 
        const per = avg / target;
        switch (true) {
            case (per >= 1):
                return 3;
            case (per >= 0.5):
                return 2;
            default:
                return 1;
        }
    };
    const ratings_desc = [
        'you need more training.',
        'almost there.',
        'great! you made it.'
    ];
    
    const hours_exercised = hours.filter(hour => hour > 0);
    const avg_hours = hours.length ? hours_exercised.reduce((a, b) => a + b) / hours.length : 0;
    const rating = getRating(avg_hours, target);

    return {
        periodLength: hours.length,
        trainingDays: hours_exercised.length,
        success: rating === 3,
        rating: rating,
        ratingDescription: ratings_desc[rating-1],
        target: target,
        average: avg_hours 
    };
};


const processArgs = (args: string[]) : number[] =>  {
    if (args.length < 2)
        throw new Error('At least two arguments are required.');

    const values = args.map((arg,i) => {
        const num = Number(arg);
        if (isNaN(num))
            throw new Error(`Argument#${i} (${arg}) is invalid. Must be a number.`);
        if (num < 0)
            throw new Error(`Argument#${i} (${arg}) is invalid. Cannot be less than zero.`);
        return num;
    });
    return values;
};

if (require.main === module) {
    try {
        const values = processArgs(process.argv.slice(2));
        const target = values.shift();
        if (target) {
            const result = calculateExercises(values, target);
            console.log(result);
        }
        else throw new Error('Target invalid');
        
    }
    catch (error: unknown)
    {
        let msg = 'Error occured:\n';
        if (error instanceof Error)
            msg += '> ' + error.message;
        console.log(msg);
        
    }
}

export default calculateExercises;

