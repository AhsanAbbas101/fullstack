import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    TableHead,
    Stack,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Grid2 as Grid,
} from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
export const UserList = ({ users }) => {
    return (
        <>
            <h1>Users</h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="h5">Name</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="h5">
                                    Blogs Created
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <Typography
                                        component={Link}
                                        to={`/users/${user.id}`}
                                        variant="h6">
                                        {user.name}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="h6">
                                        {user.blogs.length}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

const User = ({ user }) => {
    if (!user) {
        return null
    }

    return (
        <>
            <Stack>
                <h1>{user.name}</h1>
                <Grid
                    xs={12}
                    md={6}>
                    <Typography
                        sx={{ mt: 4, mb: 2 }}
                        variant="h6"
                        component="div">
                        Added Blogs
                    </Typography>

                    <List>
                        {user.blogs.map((blog) => (
                            <ListItem key={blog.id}>
                                <ListItemIcon>
                                    <ArrowForwardIosIcon />
                                </ListItemIcon>
                                <ListItemText primary={blog.title} />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Stack>
        </>
    )
}

export default User
