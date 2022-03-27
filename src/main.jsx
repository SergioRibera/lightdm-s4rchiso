import React from 'react'
import ReactDOM from 'react-dom'
import LoginBox from './components/LoginBox'
import PowerBox from './components/PowerControls'
import "./index.css"

const App = () => {
    return (
        <div>
            <div>
                <LoginBox />
                <PowerBox />
            </div>
        </div>
    )
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)
