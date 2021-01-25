import React, {Component} from 'react';
import {Container, Row} from 'react-bootstrap'
import NavList from '../nav-list'
import DataTree from "../data-tree/data-tree";

import 'bootstrap/dist/css/bootstrap.min.css';


export default class App extends Component {

    state = {
        db: 'Applications'
    }

    onChangeDataBase = (db) => {
        this.setState({
            db: db
        });
    }

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    render() {
        const {db} = this.state;
        return (
            <>
                <Container className={'justify-content-md-center'}>
                    <Row>
                        <NavList onChangeDataBase={this.onChangeDataBase}/>
                        <DataTree db={db}/>
                    </Row>
                </Container>
            </>
        )
    }
}

