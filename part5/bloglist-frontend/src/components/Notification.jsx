import '../styles/notification.css'
import PropTypes from 'prop-types'

const Notification = ({ notification }) => {

    if (notification === null) {
        return null
    }

    const { positive, msg } = notification
    const msgstyle = { color: positive ? 'green': 'red' }
    return (
        <div className='error' style={msgstyle}> {msg} </div>
    )
}

Notification.propTypes = {
    notification: PropTypes.exact({
        positive: PropTypes.bool,
        msg: PropTypes.string
    }).isRequired
}

export default Notification
