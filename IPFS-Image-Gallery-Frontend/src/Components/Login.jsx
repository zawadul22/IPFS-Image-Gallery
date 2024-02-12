import { useState } from "react";
import './Login.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Config/Firebase.js'
import { Alert, Button, TextField } from "@mui/material";
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';

const Login = (props) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [blank, setBlank] = useState(false);

    const saveEamil = (e) => {
        setEmail(e.target.value);
    }

    const savePassword = (e) => {
        setPassword(e.target.value);
    }

    const signIn = () => {
        if (email && password) {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    props.login(user.uid);
                })
                .catch((e) => {
                    setError(true);
                    console.error(e);
                })
        }
        else {
            setBlank(true);
        }
    }

    return (
        <div className="login-container">
            <div className="textbox">
                <TextField label="Email" variant="outlined" onChange={saveEamil} />
                <TextField label="Password" variant="outlined" type="password" onChange={savePassword} />
                <Button variant="contained" onClick={signIn}>Sign In</Button>
                {error && (
                    <Alert icon={<ErrorIcon />} severity="error">
                        Could not login! Please try again.
                    </Alert>
                )}
                {blank &&
                    <Alert icon={<WarningIcon />} severity="warning">
                        Please fill the required areas!!
                    </Alert>
                }
                <div style={{ textAlign: 'center' }}>Not a user? Click <a href="/register">here</a> to signup</div>
            </div>
        </div>
    )
}

export default Login;
