import { useState, useEffect } from 'react'
import loginService from '../services/login'

/*
* Login component 
* 
*/
const Login = (props) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const onLogin = async (event) => {
        event.preventDefault()
    
        try {
            const user = await loginService.login({username,password})
            user.token = loginService.setToken(user.token)

            window.localStorage.setItem(
                'loggedAppUser', JSON.stringify(user)
            ) 

            props.setUser(user)
            setUsername('')
            setPassword('')
        } 
        catch (exception) {
            props.handleError('Invalid username or password')
        }
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