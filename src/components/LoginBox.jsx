import { useState } from 'react';
import '../styles/LoginBox.css';

import DefaultAvatar from '../assets/profile.png';
import Selector from './Selector';
import { useStickyState } from '../providers/hooks';
import { getUsers, getSessions, loggin } from '../providers/auth';

// import { lightdm } from 'nody-greeter-types';
const lightdm = window.lightdm


const LoginBox = ({ }) => {

    const users = getUsers();
    const sessions = getSessions();

    //
    // States
    //
    const [userIndex, setUserIndex] = useStickyState("userIndex", 0, (value) => value < 0 ? 0 : value > users.length - 1 ? 0 : value);
    const [sessionIndex, setSessionIndex] = useStickyState("sessionIndex", 0, (value) => value < 0 ? 0 : value > sessions.length - 1 ? 0 : value);
    const [avatar, setAvatar] = useState(users.length > 0 ? users[userIndex] ? users[userIndex].image : DefaultAvatar : DefaultAvatar);
    const [loggingIn, setLoggingIn] = useState({ v: false, msg: "" });
    const [psswd, setPsswd] = useState("");

    //
    // Handlers
    //
    const handleUserChange = ({ index }) => {
        if (users[index].image && users[index].image.length > 0)
            setAvatar(users[index].image);
        else
            setAvatar(DefaultAvatar);
        setUserIndex(index);
    }
    const handleSessionChange = ({ index }) => setSessionIndex(index);
    const handlerLoggin = () => {
        if (!loggingIn.v) {
            setLoggingIn({ v: true, msg: "" });
            loggin({ user: users[userIndex], session: sessions[sessionIndex], psswd }).then(() => {
                console.log("Logged in, start authentication");
            }).catch(msg => {
                setLoggingIn({ v: false, msg });
            });
        }
    }

    /*
    *
    *   Handle window events
    *
    */
    window.show_prompt = (text, type) => {
        console.log("show_prompt", text, type);
        if (text.trim().toLowerCase().includes("login") || type === 0) {
            console.log("username");
            lightdm.respond(users[userIndex].username)
        }
        if (text.trim().toLowerCase().includes("password") || type === 1) {
            console.log("password");
            if (psswd.length === 0)
                setLoggingIn({ v: false, msg: "Insert your password" });
            else
                lightdm.respond(psswd);
        }
    }

    window.show_message = function(msg, type) {
        console.log("Entry show_message", msg, type);
        setLoggingIn({ v: false, msg });
        lightdm.cancel_authentication();
    };

    window.authentication_complete = function() {
        if (lightdm.is_authenticated) {
            console.log("authenticated");
            lightdm.start_session(sessions[sessionIndex].key)
            setLoggingIn({ v: true, msg: "" });
        } else {
            console.log("Not authenticated");
            setLoggingIn({ v: false, msg: "Authentication failed" });
        }
    }

    return (
        <div className="login-box">
            <img src={avatar} onError={h => {
                h.currentTarget.onerror = null;
                h.currentTarget.src = DefaultAvatar;
            }} className="image-profile" alt="User Profile" />
            <Selector items={users} defaultIndex={userIndex} onChange={handleUserChange} />
            <Selector items={sessions} defaultIndex={sessionIndex} onChange={handleSessionChange} />
            <input className="input-password"
                autoFocus
                placeholder="Enter your password"
                type="password"
                onChange={e => setPsswd(e.target.value)}
                onKeyPress={({ key }) => key === "Enter" ? handlerLoggin() : null}
            />
            {loggingIn.msg ? <div className="login-box-msg">{loggingIn.msg}</div> : null}
            <div className="btn-login" onClick={handlerLoggin}>{loggingIn.v ? <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div> : "Login"}</div>
        </div>
    );
}

export default LoginBox;
