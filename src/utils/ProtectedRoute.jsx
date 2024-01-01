import { useEffect } from "react"
import useUser from "../features/authentication/useUser"
import { user } from "../services/apiAuth"
import { useNavigate } from "react-router-dom"
import Spinner from "../ui/Spinner"
import { styled } from "styled-components"

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`

export default function ProtectedRoute({ children }) {
    const { user, error, isLoading, isAuthenticated } = useUser()
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated && !isLoading) navigate('/login');
    }, [isAuthenticated, isLoading, navigate])

    if (isLoading) return <FullPage><Spinner /> </FullPage>


    if (isAuthenticated) return children
}