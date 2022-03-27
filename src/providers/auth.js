// import { lightdm } from 'nody-greeter-types';

import Profile from '../assets/profile.png'
import Profile2 from '../assets/zerotwo.png'

const lightdm = window.lightdm || {
    _current_request: { code: 0, message: "Username:" },
    _current_username: "",
    _current_session: "",
    _current_language: "",
    _current_layout: "",
    _current_password: "",
    is_authenticated: false,
    users: [
        {
            display_name: "Sergio Ribera",
            image: Profile,
            username: "sergioribera",
        },
        {
            display_name: "S4rch",
            image: Profile2,
            username: "s4rch",
        },
        {
            display_name: "Sergio Alejandro",
            image: Profile,
            username: "sergio_alejandro",
        },
    ],
    sessions: [
        { name: "Gnome", key: "gnome" },
        { name: "Gnome Wayland", key: "gnome" },
        { name: "bspwm", key: "bspwm" },
        { name: "leftwm", key: "leftwm" },
        { name: "dwm", key: "dwm" }
    ],
    authenticate: (user) => {
        console.log("Authenticate", user);
        setTimeout(() => {
            if (window.show_prompt) {
                if (!user)
                    window.show_prompt("User login:", 0);
                else
                    window.show_prompt("Password:", 1);
            }
        }, 3000);
    },
    shutdown: () => alert("Shutdown"),
    restart: () => alert("Restart"),
    hibernate: () => alert("Hibernate"),
    suspend: () => alert("Suspend"),
    cancel_authentication: () => {
        console.log("Cancel authentication")
        self.is_authenticated = false;
        self._current_username = "";
        self._current_session = "";
        self._current_language = "";
        self._current_layout = "";
        self._current_password = "";
    },
    start_session: (session) => {
        console.log("Start session", session)
        alert(`Start session ${session} with user ${self._current_username} and password ${self._current_password}`);
    },
    respond: (response) => {
        console.log("Respond", response)
        if (self._current_request.code === 0) {
            self._current_request.code = 1;
            self._current_request.message = "Password:";
            self._current_username = response;
        } else if (self._current_request.code === 1) {
            if (response.length === 0) {
                if (window.show_message) {
                    window.show_message("Password is too short", 1);
                }
            } else {
                self._current_request.code = 2;
                self._current_request.message = "";
                self._current_password = response;
                self.is_authenticated = true;
                if (window.authentication_complete)
                    window.authentication_complete();
            }
        }
    },
};

/*

    


*/
const getUsers = () => {
    if (lightdm && lightdm.users)
        return [... new Set(lightdm.users)];
    return [
        {
            display_name: "S4rch",
            image: "/usr/share/web-greeter/themes/s4rchiso/src/assets/zerotwo.png",
            username: "s4rch",
        },
    ];
}

const getSessions = () => {
    if (lightdm && lightdm.sessions)
        return [... new Set(lightdm.sessions)];
    return [
        { name: "Gnome", key: "gnome" },
        { name: "bspwm", key: "bspwm" },
    ]
}

const loggin = ({ user, session, psswd }) => {
    console.log(user, session, psswd);
    return new Promise((resolve, reject) => {
        console.log("Entry promisse");
        if (psswd.length === 0) {
            reject("Insert your password");
            return;
        }
        if (lightdm) {
            console.log("Entry lightdm");
            lightdm.cancel_authentication()
            lightdm.authenticate(String(user.username));
            resolve();
        } else {
            console.log("No lightdm");
            reject("No lightdm");
        }
    });
}

export { lightdm, getUsers, getSessions, loggin };
