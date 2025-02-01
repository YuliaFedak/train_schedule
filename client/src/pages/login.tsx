import React, {useState} from 'react';
import {TRAIN_TABLE_PAGE, WELCOME_PAGE} from "../utils/consts";
import {Col, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import '../style/general.css'
import {login} from "../api/auth";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate()
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidated(false);
            return;
        }
        const loginType = {
            email,
            password
        };
        try {
            await login(loginType);
            setValidated(true);
            navigate(TRAIN_TABLE_PAGE);
        } catch (error) {
            toast.error('Wrong username or password!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
        }
    };

    return (
        <div>
            <Row style={{marginTop: 0, marginRight: 0, marginLeft: 0}}>
                <Col md={7} className="register">
                    <h3 className='create-account'>
                        Welcome
                    </h3>
                    <form className='form' noValidate validated={validated} onSubmit={handleSubmit}>
                        <input
                            className="fname"
                            type="email"
                            name="name"
                            placeholder="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <input
                            className="fname"
                            type="password"
                            name="name"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button className="buttonSignUp" type="submit">SIGN IN</button>
                    </form>
                </Col>
                <Col md={5} className='welcomePage' style={{height: window.innerHeight}}>
                    <div className='welcome'>
                        <h4 className='h4'>Don't have an account?<br/> Please Sign up!</h4>
                    </div>
                    <div>
                        <button
                            style={{marginTop: window.innerHeight - window.innerHeight/2}}
                            className='button-sign-in'
                            onClick={() => navigate(WELCOME_PAGE)}>SIGN UP</button>
                    </div>
                </Col>

            </Row>
            <ToastContainer />
        </div>
    );
};

export default Login;
