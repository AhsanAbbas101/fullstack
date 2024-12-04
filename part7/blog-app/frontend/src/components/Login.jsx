import { useState } from 'react'

import { Box, Stack, Button, TextField, Card, Typography } from '@mui/material'

const Login = ({ doLogin }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (event) => {
        event.preventDefault()
        doLogin({ username, password })
        setUsername('')
        setPassword('')
    }

    return (
        <form onSubmit={handleLogin}>
            <Box
                sx={{
                    p: 2,

                    textAlign: 'center',
                }}>
                <Typography variant="h5">Login to Blogs App</Typography>
                <br />
                <Stack
                    spacing={2}
                    alignItems={'center'}
                    justifyContent="center">
                    <TextField
                        id="standard-basic"
                        label="Username"
                        variant="standard"
                        data-testid="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <TextField
                        id="standard-password-input"
                        variant="standard"
                        label="Password"
                        type="password"
                        value={password}
                        data-testid="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        type="submit">
                        LOGIN
                    </Button>
                </Stack>
            </Box>
        </form>
    )
}

export default Login
