import React, {FC, useContext} from 'react';
import {Context} from "../index";
import {useNavigate} from "react-router-dom";

interface NavBarProps{
    userName: string
}

const NavBar: FC<NavBarProps>= (props) => {
    const {userStore} = useContext(Context);
    const navigate = useNavigate();
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="/api/activities/">Activities</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/api/projects/">Projects</a>
                    </li>
                </ul>
            </div>
            <div className="my-2 my-lg-0">
                {userStore.user.isAdmin && <span className="mr-sm-2 text-primary">{props.userName}</span>}
                {!userStore.user.isAdmin && <span className="mr-sm-2 text-black">{props.userName}</span>}
                <button onClick={() => {
                    navigate('/api/activities/')
                    userStore.logout();
                    //actStore.setActivities([] as IActivity[])
                }} className="btn btn-outline-danger ml-1 my-2 my-sm-0">Выйти</button>
            </div>
        </nav>
    );
};

export default NavBar;