import React, { useState } from 'react'

const SignupForm = ({ submit, header }) => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')


    return (
        <form className="form" onSubmit={e => {
            e.preventDefault();
            submit({ username, password, name })
            setUsername('')
            setPassword('')
            setName('')
        }}>
            <span style={{display: 'flex', justifyContent: 'center'}}>{header}</span>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <input placeholder="name" type="name" name="name" value={name} onChange={e => setName(e.target.value)} />
                <input placeholder="username" type="username" name="username" value={username} onChange={e => setUsername(e.target.value)} />
                <input placeholder="Password" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                <input type="submit" />
            </div>
        </form>
    )
}

export default SignupForm