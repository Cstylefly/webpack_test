'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import './demo.less'
import IuLogo from './images/iu.jpeg'
// import Common from "../commons/common";
import {a,b} from './utils/util'

class App extends Component{
    componentDidMount(){
        console.log(a())
    }
    render(){
        return (
            <div className="webpack-test">
                hello webpack1256
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