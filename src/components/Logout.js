import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const Logout = () => {

    useEffect(() => {
        localStorage.removeItem("user")
        //istory.push("/");
    }, [])
    return (
        <div>
        <Redirect to="/" />
        </div>
    );
}

export default Logout;