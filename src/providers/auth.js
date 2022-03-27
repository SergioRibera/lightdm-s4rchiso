// import { lightdm } from 'nody-greeter-types';
const lightdm = window.lightdm;

/*

    


*/
const getUsers = () => {
    if (lightdm && lightdm.users)
        return [... new Set(lightdm.users)];
    return [
        {
            display_name: "Sergio Ribera",
            image: "/usr/share/web-greeter/themes/s4rchiso/src/assets/profile.png",
            username: "sergioribera",
        },
        {
            display_name: "S4rch",
            image: "/usr/share/web-greeter/themes/s4rchiso/src/assets/zerotwo.png",
            username: "s4rch",
        },
        {
            display_name: "Sergio Alejandro",
            image: "/usr/share/web-greeter/themes/s4rchiso/src/assets/zerotwo.png",
            username: "sergio_alejandro",
        },
    ];
}

const getSessions = () => {
    if (lightdm && lightdm.sessions)
        return [... new Set(lightdm.sessions)];
    return [{ name: "Gnome", key: "gnome" }, { name: "Gnome Wayland", key: "gnome" }, { name: "bspwm", key: "bspwm" }, { name: "leftwm", key: "leftwm" }, { name: "dwm", key: "dwm" }];
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

export { getUsers, getSessions, loggin };
