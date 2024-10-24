import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Container>
            <Content>
                <Title>Welcome to the Chat Application</Title>
                <ButtonGroup>
                    <StyledLink to="/login">Login</StyledLink>
                    <StyledLink to="/register">Register</StyledLink>
                </ButtonGroup>
            </Content>
        </Container>
    );
};

export default Home;

// สไตล์ต่างๆ
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f9fafb;
`;

const Content = styled.div`
    text-align: center;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 20px;
`;

const StyledLink = styled(Link)`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border-radius: 5px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #0056b3;
    }
`;
