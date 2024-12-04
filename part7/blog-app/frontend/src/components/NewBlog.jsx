import React, { useState } from 'react'

import { Button, Stack, TextField } from '@mui/material'

const NewBlog = ({ doCreate }) => {
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [author, setAuthor] = useState('')

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleUrlChange = (event) => {
        setUrl(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        doCreate({ title, url, author })
        setAuthor('')
        setTitle('')
        setUrl('')
    }

    return (
        <div>
            <h2>Create a New Blog</h2>
            <form onSubmit={handleSubmit}>
                <Stack
                    direction={'row'}
                    spacing={2}
                    alignItems={'center'}
                    justifyContent="center">
                    <TextField
                        id="standard-basic"
                        label="Title"
                        variant="standard"
                        type="text"
                        data-testid="title"
                        value={title}
                        onChange={handleTitleChange}
                    />
                    <TextField
                        id="standard-basic"
                        label="URL"
                        variant="standard"
                        type="text"
                        data-testid="url"
                        value={url}
                        onChange={handleUrlChange}
                    />
                    <TextField
                        id="standard-basic"
                        label="Author"
                        variant="standard"
                        type="text"
                        data-testid="author"
                        value={author}
                        onChange={handleAuthorChange}
                    />
                    <Button
                        type="submit"
                        variant="contained">
                        Create
                    </Button>
                </Stack>

                <br />
            </form>
        </div>
    )
}

export default NewBlog
