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
            <h4>comments</h4>
            <form onSubmit={handleAddComment}>
                <input
                    type="text"
                    placeholder="Add a comment"
                    name="comment"
                />
                <input
                    type="submit"
                    value="Add comment"
                />
            </form>
            <div>
                <ul>
                    {blog.comments &&
                        blog.comments.map((comment, i) => (
                            <li key={i}>{comment}</li>
                        ))}
                </ul>
            </div>
        </>
    )
}

export default CommentList
