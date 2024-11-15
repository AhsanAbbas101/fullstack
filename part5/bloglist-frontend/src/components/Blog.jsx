import { useState, useEffect } from 'react'

export const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)

export const BlogForm = ({createBlog}) => {
  
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const OnCreate = async (event) => {
    event.preventDefault()

    await createBlog({title, author, url})
    console.log('here');
    
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
        onChange={({target}) => setTitle(target.value)}
      />
    </div>
    <div>
      author
      <input
        type="text"
        value={author}
        name="Author"
        onChange={({target}) => setAuthor(target.value)}
      />
    </div>
    <div>
      url
      <input
        type="text"
        value={url}
        name="URL"
        onChange={({target}) => setURL(target.value)}
      />
    </div>
    <button type='submit'>create</button>
  </form>
  )
}

export default Blog