import { Link } from 'react-router-dom'
import {
    AppBar,
    Stack,
    MenuItem,
    Toolbar,
    Typography,
    Box,
    Button,
    Divider,
} from '@mui/material'

const Navigation = ({ user, doLogout }) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Stack
                        direction="row"
                        sx={{ flexGrow: 1 }}>
                        <Typography
                            variant="h6"
                            component="div"
                            display="inline-block"
                            mr={2}
                            padding={0}
                            color="inherit">
                            BLOG APP
                        </Typography>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/">
                            BLOGS
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/users">
                            USERS
                        </Button>
                    </Stack>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ mr: 2 }}>
                        <em>{user.name}</em>
                    </Typography>
                    <Divider orientation="vertical" />
                    <Button
                        color="inherit"
                        onClick={doLogout}>
                        {' '}
                        LOGOUT
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default Navigation
