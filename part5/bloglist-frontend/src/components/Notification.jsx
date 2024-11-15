import '../styles/notification.css'

const Notification = ({notification}) => {

    if (notification === null) {
      return null
    }
  
    const {positive, msg} = notification
    const msgstyle = {color: positive ? 'green': 'red'}
    return (
      <div className='error' style={msgstyle}> {msg} </div>
    )
}

export default Notification
  