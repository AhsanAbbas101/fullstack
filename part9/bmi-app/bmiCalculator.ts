

const calculateBmi = (height: number, weight: number): string => {
    const height_m2 = Math.pow(height / 100, 2)
    if (height_m2 === 0)
        throw new Error('height can\'t be 0!');

    const bmi = weight / height_m2
    switch (true) {
        case (bmi < 16.0):
            return 'Underweight (Severe thinness)'
        case (bmi < 17.0):
            return 'Underweight (Moderate thinness)'
        case (bmi < 18.5):
            return 'Underweight (Mild thinness)'
        case (bmi < 25.0):
            return 'Normal range'
        case (bmi < 30.0):
            return 'Overweight (Pre-obese)'
        case (bmi < 35.0):
            return 'Obese (Class I)'
        case (bmi < 40.0):
            return 'Obese (Class II)'
        default:
            return 'Obese (Class III)'
    }
}

const processArguments = (args: string[]) : number[] =>  {
    if (args.length < 2)
        throw new Error('Two arguments are required.')
    if (args.length > 2)
        throw new Error('Too many arguments.')

    const values = args.map((arg,i) => {
        const num = Number(arg)
        if (isNaN(num))
            throw new Error(`Argument#${i} (${arg}) is invalid. Must be a number.`)
        if (num < 0)
            throw new Error(`Argument#${i} (${arg}) is invalid. Cannot be less than zero.`)
        return num
    })
    return values
}


try {
    console.log(process.argv);
    
    const values = processArguments(process.argv.slice(2))
    console.log(calculateBmi(values[0],values[1]));
}
catch (error: unknown) {
    console.log('Something went wrong!');
    
    if (error instanceof Error)
    {
        console.log("Error! ", error.message);
    }
}