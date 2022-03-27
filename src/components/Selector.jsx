import { useState } from 'react';
import '../styles/Selector.css';

import leftArrow from '../assets/caret-left.svg';
import rightArrow from '../assets/caret-right.svg';


const Selector = ({ items, defaultIndex, onChange }) => {

    const [elements, setElements] = useState(items);
    const [selectedIndex, setSelectedIndex] = useState(defaultIndex);

    const handleClick = (value) => {
        let newIndex = selectedIndex + value;
        newIndex = newIndex < 0 ? elements.length - 1 : newIndex > elements.length - 1 ? 0 : newIndex;
        if (onChange)
            onChange({ index: newIndex, item: elements[newIndex] })
        setSelectedIndex(newIndex);
    }

    return (
        <div className="login-selector">
            {elements.length > 1 &&
                    <div className="selector-left">
                        <img src={leftArrow} alt="left arrow" onClick={() => handleClick(-1)} />
                    </div>
            }
            {elements.length > 0 &&
                <div className="selector-content" >
                    <div>{elements[selectedIndex].display_name || elements[selectedIndex].name}</div>
                </div>
            }
            {elements.length > 1 &&
                <div className="selector-right">
                    <img src={rightArrow} alt="right arrow" onClick={() => handleClick(1)} />
                </div>
            }
        </div>
    );
}

export default Selector;
