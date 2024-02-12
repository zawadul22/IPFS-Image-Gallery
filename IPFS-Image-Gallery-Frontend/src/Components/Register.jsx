import { useState, useContext } from "react";
import './Login.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Config/Firebase.js'
import { Alert, Button, TextField } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';


const Register = () => {

    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [isBlank, setIsBlank] = useState(false);
    
    const saveEamil = (e) => {
        setEmail(e.target.value);
    }

    const savePassword1 = (e) => {
        setPassword1(e.target.value);
    }

    const savePassword2 = (e) => {
        setPassword2(e.target.value);
    }

    const signUp = () => {
        if (email && password1 && password2) {
            if (password1 === password2) {
                createUserWithEmailAndPassword(auth, email, password1)
                    .then((userCredential) => {
                        setSuccess(true);
                    })
                    .catch((e) => {
                        setError(true);
                        console.error(e);
                    })
            }
            else {
                setError(true);
            }
        }
        else {
            setIsBlank(true)
        }
    }

    return (
        <div className="login-container">
            <div className="textbox">
                <TextField label="Email" variant="outlined" onChange={saveEamil} />
                <TextField label="Password" variant="outlined" type="password" onChange={savePassword1} />
                <TextField label="Confirm Password" variant="outlined" type="password" onChange={savePassword2} />
                <Button variant="contained" onClick={signUp}>Sign Up</Button>
                {success && (
                    <Alert icon={<CheckIcon />} severity="success" >
                        Signup successful. Click <a href="/">here</a> to login.
                    </Alert>
                )}
                {error && (
                    <>
                        <Alert icon={<ErrorIcon />} severity="error">
                            Something went wrong!! Please try again.
                        </Alert>
                        <div style={{ textAlign: 'center' }}>
                            Click <a href="/">here</a> to go to the login page
                        </div>
                    </>
                )}
                {isBlank &&
                    <Alert icon={<WarningIcon />} severity="warning">
                        Please fill the required areas!!
                    </Alert>
                }
                {error || success === false && (
                    <div style={{ textAlign: 'center' }}>Already a user? Click <a href="/">here</a> to login</div>
                )}
            </div>
        </div>
    )
}

export default Register;