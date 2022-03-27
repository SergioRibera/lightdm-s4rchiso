import React from 'react';
import '../styles/PowerControls.css';
import iconPowerOff from '../assets/action-shutdown.png';
import iconReboot from '../assets/action-reboot.png';
import iconHibernate from '../assets/action-hibernate.png';
import iconSleep from '../assets/action-sleep.png';

// import { lightdm } from "nody-greeter-types"
const lightdm = window.lightdm

import PowerButton from './PowerButton';


const shutdown = () => lightdm.shutdown()
const reboot = () => lightdm.restart()
const hibernate = () => lightdm.hibernate()
const sleep = () => lightdm.suspend()


const PowerControls = () => {
    return (
        <div className="power-box">
            {lightdm &&
                <>
                    <PowerButton icon={iconPowerOff} ev={shutdown} alt="Poweroff" />
                    <PowerButton icon={iconReboot} ev={reboot} alt="Reboot" />
                    <PowerButton icon={iconHibernate} ev={hibernate} alt="Hibernate" />
                    <PowerButton icon={iconSleep} ev={sleep} alt="Sleep" />
                </>
            }  
        </div>
    );
}

export default PowerControls;
