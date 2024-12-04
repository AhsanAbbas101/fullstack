import { Stack, Typography, Box, Button, TextField, Grid2 } from '@mui/material'
import { commentBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const CommentList = ({ blog }) => {
    const dispatch = useDispatch()

    const handleAddComment = (event) => {
        event.preventDefault()
        const comment = event.target.comment.value
        event.target.comment.value = ''
        dispatch(commentBlog(blog.id, comment))
    }

    return (
        <>
            <h2>Comments</h2>
            <form onSubmit={handleAddComment}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                        name="comment"
                        fullWidth
                        variant="outlined"
                        label="Add a comment"
                        sx={{ flexGrow: 1 }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit">
                        Add
                    </Button>
                </Box>
            </form>
            <br />
            <div>
                <Stack
                    spacing={2}
                    sx={{ width: '100%', margin: 'auto' }}>
                    {blog.comments.map((comment, i) => (
                        <Box
                            key={i}
                            sx={{
                                border: '1px solid #ccc',
                                borderRadius: '0px',
                                padding: '5px',
                                marginLeft: '50px',
                                backgroundColor: '#f9f9f9',
                                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                            }}>
                            <Typography
                                variant="h6"
                                sx={{ marginBottom: '8px' }}>
                                {comment.author}
                            </Typography>
                            <Typography variant="body1">{comment}</Typography>
                        </Box>
                    ))}
                </Stack>
                <ul></ul>
            </div>
        </>
    )
}

export default CommentList
