'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import './demo.less'
import IuLogo from './images/iu.jpeg'

class App extends Component{
    render(){
        return (
            <div className="webpack-test">
                hello webpack
                <p className="webpack-test-les">hhhh</p>
                <img src={IuLogo} />
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)