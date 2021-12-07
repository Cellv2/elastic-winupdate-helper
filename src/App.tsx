import React from "react";
import RbCol from "react-bootstrap/Col";
import RbContainer from "react-bootstrap/Container";
import RbRow from "react-bootstrap/Row";
import "./App.css";
import BackupActions from "./components/BackupActions";
import ClusterActions from "./components/ClusterActions";
import ClusterInfo from "./components/ClusterInfo";
import Header from "./components/Header";
import NodeInfo from "./components/NodeInfo";
import Sidebar from "./components/Sidebar";
import { Counter } from "./features/counter/Counter";
import logo from "./logo.svg";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <RbContainer fluid>
                    <RbRow>
                        <RbCol xs={2} />
                        <RbCol>
                            <Header heading="Connected Cluster" />
                        </RbCol>
                    </RbRow>
                    <RbRow>
                        <RbCol xs={2}>
                            <Sidebar />
                        </RbCol>
                        <RbCol>
                            <NodeInfo />
                            <ClusterInfo />
                            <ClusterActions />
                            <BackupActions />
                        </RbCol>
                    </RbRow>
                </RbContainer>
                <img src={logo} className="App-logo" alt="logo" />
                <Counter />
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <span>
                    <span>Learn </span>
                    <a
                        className="App-link"
                        href="https://reactjs.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        React
                    </a>
                    <span>, </span>
                    <a
                        className="App-link"
                        href="https://redux.js.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Redux
                    </a>
                    <span>, </span>
                    <a
                        className="App-link"
                        href="https://redux-toolkit.js.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Redux Toolkit
                    </a>
                    ,<span> and </span>
                    <a
                        className="App-link"
                        href="https://react-redux.js.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        React Redux
                    </a>
                </span>
            </header>
        </div>
    );
}

export default App;
