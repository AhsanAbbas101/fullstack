import { AxiosError } from 'axios'
import { z } from 'zod'
import {fromError} from 'zod-validation-error'

export const serviceErrorHandler = (error: unknown) : string => {
    console.log('called');
    
    let msg = ''
    if (error instanceof z.ZodError)
    {
        msg += fromError(error).toString()
    }
    else if (error instanceof AxiosError) {
    
        msg += `${error.name} ${error.message}; `
        if (error.response) {
            msg += `Status: ${error.response.status}`
        }
    }
    else if (error instanceof Error)
    {
        msg += `${error.name}: ${ error.message}`
    }
    else {
        msg+= `unhandled error type ${typeof error}`;
    }
    return msg
}