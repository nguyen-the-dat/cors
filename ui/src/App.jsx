import {useEffect, useState} from 'react'


const baseApi = 'http://localhost:3000/api'

function App() {
    useEffect(() => {
        fetch(`${baseApi}/auth/me`, {
            credentials: "include",
        })
            .then(res => res.json())
            .then(me => {
                setUser(me);
            })
    }, [])
    const [error, setError] = useState('');
    const [fields, setFields] = useState({
        email: 'nguyenvana@gmail.com', password: '123456'
    })
    const [user, setUser] = useState(null);
    const setFieldValue = ({target: {name, value}}) => {
        setFields(prev => ({
            ...prev, [name]: value
        }))
    }

    const handleLogin = e => {
        e.preventDefault();
        setError('');
        fetch(`${baseApi}/auth/login`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json' // chu thich gui theo dang json
            }, credentials: 'include', body: JSON.stringify(fields)
        })
            .then(res => {
                if (res.ok) return res.json()
                throw res;
            })
            .then(user => {
                console.log(user)
            })
            .catch((error) => {
                if (error.status === 401) {
                    return setError('Email or password is incorrect!');
                }
                setError('An unknown error');
            })
    }
    return (<div>
        {
            user ? (
                <>
                    <p>Xin chao, {user.name}</p>
                    <a href="http://localhost:3000/api/auth/logout">Logout</a>
                </>


            ) : (<>

                <h1>Login</h1>
                <form onSubmit={handleLogin}>
                    <label htmlFor="email">Email</label> <br/>
                    <input type="email" name="email" value={fields.email} onChange={setFieldValue} id={"email"}/> <br/>

                    <label htmlFor="password">Password</label> <br/>
                    <input type="password" name="password" value={fields.password} onChange={setFieldValue}
                           id={"password"}/> <br/>
                    <button type={"submit"}>Login</button>
                </form>

                <p style={{color: "red"}}>{error}</p>


            </>)}
    </div>)
}

export default App
