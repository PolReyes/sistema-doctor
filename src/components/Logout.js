import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import api from '../api';

const Logout = () => {
    const nm = JSON.parse(localStorage.getItem('user'));

    const dataLogout = {
        idLogout: `${nm?nm.ID_DOCTOR:""}`,
    };

    const postLogout = async () => {
        console.log(nm);
        axios.post(`http://${api}/api/logout`,dataLogout)
        .then(response => {
        });
    }

    useEffect(() => {
        //postLogout();
        localStorage.removeItem("user");
        localStorage.removeItem('ttl');
        //history.push("/");
    }, [])

    return (
        <div>
        <Redirect to="/" />
        </div>
    );
}

export default Logout;