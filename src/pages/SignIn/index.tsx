import AuthForm from "../../components/AuthForm";
import Header from "../../components/Header";
import { Container } from './style'
import { useContext, useEffect } from "react";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
    const { token } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/repository');
        }
    }, []);

    return (
        <>
            <Header isLoggedIn={false} />
            <Container>
                <AuthForm title="Login"
                />
            </Container>
        </>
    );
}