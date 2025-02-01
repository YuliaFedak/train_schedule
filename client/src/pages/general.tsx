import React, {useState} from 'react';
import {Col, Row} from "react-bootstrap";
import '../style/general.css'
import {useNavigate} from "react-router-dom";
import {LOGIN_PAGE, TRAIN_TABLE_PAGE} from "../utils/consts";
import {register} from "../api/auth";

const General = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState<{ email?: string; confirmPassword?: string }>({})
    const [validated, setValidated] = useState(false)

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(email)
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;

        const newErrors: { email?: string; confirmPassword?: string } = {};

        if (!validateEmail(email)) {
            newErrors.email = 'Invalid email format';
        }

        if (password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);

        if (form.checkValidity() === false || Object.keys(newErrors).length > 0) {
            event.stopPropagation();
            setValidated(false);
            return;
        }

        const registerType = {
            username,
            email,
            password
        };


        await register(registerType);
        setValidated(true);
        navigate(TRAIN_TABLE_PAGE)
    };

    return (
        <div>
            <Row style={{marginTop: 0, marginRight: 0, marginLeft: 0}}>
                <Col md={5} className='welcomePage' style={{height: window.innerHeight}}>
                    <div className='welcome'>
                        <h2 className='h2'>Welcome to the train schedule application</h2>
                        <h4 className='h4'>If you already have an account, just sign in</h4>
                    </div>
                    <div>
                        <button
                            style={{marginTop: window.innerHeight - window.innerHeight/2}}
                            className='button-sign-in'
                            onClick={() => navigate(LOGIN_PAGE)}>SIGN IN</button>
                    </div>

                </Col>
                <Col md={7} className="register">
                    <h3 className='create-account'>
                        Create your Account
                    </h3>
                    <form className='form' noValidate validated={validated} onSubmit={handleSubmit}>
                        <input
                            className="fname"
                            type="text"
                            name="name"
                            placeholder="Full name"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                        />
                        <input
                            className="fname"
                            type="email"
                            name="name"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            isInvalid={!!errors.email}
                            required
                        />
                        <input
                            className="fname"
                            type="password"
                            name="name"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                        <input
                            className="fname"
                            type="password"
                            name="name"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            isInvalid={!!errors.confirmPassword}
                            required
                        />
                        <button className="buttonSignUp" type='submit'>SIGN UP</button>
                    </form>
                </Col>
            </Row>
        </div>
    );
};

export default General;
