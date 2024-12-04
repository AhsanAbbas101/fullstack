import { useState, forwardRef, useImperativeHandle } from 'react'

import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility,
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button
                    variant="outlined"
                    onClick={toggleVisibility}
                    endIcon={<AddIcon />}>
                    {props.buttonLabel}
                </Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button
                    variant="outlined"
                    onClick={toggleVisibility}>
                    cancel
                </Button>
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'

export default Togglable
