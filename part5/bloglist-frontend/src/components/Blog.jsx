import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

export const Blog = ({ blog, onLikeClick, onRemoveClick, loggedUsername }) => {

    const [isDetailed, setIsDetailed] = useState(false)

    const toggleVisibility = () => {
        setIsDetailed(!isDetailed)
    }


    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const onRemove = (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            onRemoveClick(blog)
        }
    }

    return (
        <div style={blogStyle}>
            {blog.title} {blog.author}
            <button onClick={toggleVisibility}>{ !isDetailed ? 'view' : 'hide' }</button>

            {isDetailed && <div>
                {blog.url} <br />
      likes {blog.likes} <button onClick={() => onLikeClick(blog)}>like</button><br />
                {blog.user.name} <br/>
                {blog.user.username === loggedUsername && <button onClick={() => onRemove(blog)}>remove</button>}
            </div>}
        </div>
    )

}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    onLikeClick: PropTypes.func,
    onRemoveClick: PropTypes.func.isRequired,
    loggedUsername: PropTypes.string
}


export const BlogForm = ({ createBlog }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setURL] = useState('')

    const OnCreate = async (event) => {
        event.preventDefault()

        await createBlog({ title, author, url })

        setTitle('')
        setAuthor('')
        setURL('')

    }

    return (
        <form onSubmit={OnCreate}>
            <div>
      title
                <input
                    type="text"
                    value={title}
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
      author
                <input
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
      url
                <input
                    type="text"
                    value={url}
                    name="URL"
                    onChange={({ target }) => setURL(target.value)}
                />
            </div>
            <button type='submit'>create</button>
        </form>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default Blog