import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5003/api/users/register', {
                username,
                email,
                password,
            });
            setMessage(response.data.message || 'Registration successful!');
            navigate('/login');
        } catch (error) {
            setMessage(error.response.data.message || 'Registration failed!');
        }
    };

    return (
        <Container>
            <FormWrapper>
                <Title>Register</Title>
                <Form onSubmit={handleRegister}>
                    <Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit">Register</Button>
                </Form>
                {message && <Message>{message}</Message>}
            </FormWrapper>
        </Container>
    );
};

export default Register;

// สไตล์ต่างๆ
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f9fafb;
`;

const FormWrapper = styled.div`
    background: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 400px;
`;

const Title = styled.h2`
    font-size: 24px;
    text-align: center;
    margin-bottom: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
`;

const Button = styled.button`
    padding: 10px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #218838;
    }
`;

const Message = styled.p`
    margin-top: 15px;
    text-align: center;
    color: ${props => (props.error ? '#ff4d4f' : '#28a745')};
`;
