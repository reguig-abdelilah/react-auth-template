import { useNavigate, Link, useLoaderData } from "react-router-dom";
import useAuth from "../hooks/useauth";
import useLogout from "../hooks/uselogout";
const Home = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const logout = useLogout()

    const signout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        await logout()
        navigate('/linkpage');
    }


    return (
        <section>
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <Link to="/editor">Go to the Editor page</Link>
            <br />
            <Link to="/admin">Go to the Admin page</Link>
            <br />
            <Link to="/lounge">Go to the Lounge</Link>
            <br />
            <Link to="/linkpage">Go to the link page</Link>
            <div className="flexGrow">
                <button onClick={signout}>Sign Out</button>
            </div>
        </section>
    )
}

export default Home