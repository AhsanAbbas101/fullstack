import { useState, useEffect } from 'react'


/*
* Login component 
* 
*/
const Login = ({loginUser}) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onLogin = (event) => {
        event.preventDefault()
        loginUser(username,password)

        setUsername('')
        setPassword('')
    }

    return (

        <form onSubmit={onLogin}>
            <div>
                username
                <input 
                type="text"
                value={username}
                name="Username"
                onChange={({target}) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input 
                type="password"
                value={password}
                name="Password"
                onChange={({target}) => setPassword(target.value)}
                />
            </div>
            <button type="submit">Login</button>
        </form>

    )
}

export default Login