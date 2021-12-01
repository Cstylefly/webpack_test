'use strict';

import React,{Component} from "react";
import ReactDOM from "react-dom";
import './demo.less'
import IuLogo from './images/iu.jpeg'
// import Common from "../commons/common";
import {a,b} from './utils/util'
import add from 'cstyle-first-npm'

class App extends Component{
    constructor(props){
        super(props)
        this.state = {
            Test:null
        }
    }
    componentDidMount(){
        console.log(a())
    }
    render(){
        const {Test} = this.state
        return (
            <div className="webpack-test">
                hello webpack125
                <p className="webpack-test-les">hhhh</p>
                <button onClick={() => {
                     import('./components/Test.js').then(Test => {
                        this.setState({
                            Test:Test.default
                        })  
                     })    
                }}>goigo</button>
                <img src={IuLogo}/>
                <div>
                    {
                        Test ? <Test/>:null
                    }
                </div>
                <p>{add(1,2)}</p>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)