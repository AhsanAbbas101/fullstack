import React, { useState } from 'react'
import PropTypes from 'prop-types'
import storage from '../services/storage'
import CommentList from './Comment'

import { Box, Typography, Button, Stack, IconButton, Link } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import DeleteIcon from '@mui/icons-material/Delete'

const Blog = ({ blog, handleVote, handleDelete }) => {
    const [visible, setVisible] = useState(false)

    const nameOfUser = blog.user ? blog.user.name : 'anonymous'

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5,
    }

    const canRemove = blog.user ? blog.user.username === storage.me() : true

    console.log(blog.user, storage.me(), canRemove)

    return (
        <div
            style={style}
            className="blog">
            {blog.title} by {blog.author}
            <button
                style={{ marginLeft: 3 }}
                onClick={() => setVisible(!visible)}>
                {visible ? 'hide' : 'view'}
            </button>
            {visible && (
                <div>
                    <div>
                        <a href={blog.url}>{blog.url}</a>
                    </div>
                    <div>
                        likes {blog.likes}
                        <button
                            style={{ marginLeft: 3 }}
                            onClick={() => handleVote(blog)}>
                            like
                        </button>
                    </div>
                    <div>{nameOfUser}</div>
                    {canRemove && (
                        <button onClick={() => handleDelete(blog)}>
                            remove
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.shape({
        url: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        likes: PropTypes.number.isRequired,
        user: PropTypes.object,
    }).isRequired,
    handleVote: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
}

export const BlogView = ({ blog, handleVote, handleDelete }) => {
    if (!blog) return null

    const nameOfUser = blog.user ? blog.user.name : 'anonymous'

    const canRemove = blog.user ? blog.user.username === storage.me() : true

    return (
        <div className="blog">
            <Box
                sx={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '16px',
                    backgroundColor: '#f9f9f9',
                    margin: 'auto',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                }}>
                <Typography
                    variant="h5"
                    gutterBottom>
                    Blog Title: <strong>{blog.title}</strong>
                </Typography>

                <Typography
                    variant="body1"
                    sx={{ marginBottom: 1 }}>
                    Author: <strong>{blog.author}</strong>
                </Typography>

                <Typography
                    variant="body2"
                    sx={{ marginBottom: 2 }}>
                    URL: <a href={blog.url}>{blog.url}</a>
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ marginBottom: 2 }}>
                    Added By: {nameOfUser}
                </Typography>

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}>
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}>
                        <ThumbUpIcon color="primary" />
                        <Typography variant="body2">
                            Likes: {blog.likes}
                        </Typography>
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={1}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => handleVote(blog)}
                            startIcon={<ThumbUpIcon />}>
                            Like
                        </Button>
                        {canRemove && (
                            <Button
                                variant="contained"
                                color="error"
                                aria-label="delete blog"
                                startIcon={<DeleteIcon />}
                                onClick={() => handleDelete(blog)}>
                                Delete
                            </Button>
                        )}
                    </Stack>
                </Stack>
            </Box>

            <br />
            <br />
            <CommentList blog={blog} />
        </div>
    )
}

export default Blog
