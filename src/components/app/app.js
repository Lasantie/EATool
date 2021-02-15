import React, {Component} from 'react';
import {Container} from 'react-bootstrap'
import NavList from '../nav-list'
import DataTree from "../data-tree/data-tree";

import 'bootstrap/dist/css/bootstrap.min.css';


export default class App extends Component {

    state = {
        db: '',
        filter: ''
    }

    onChangeDataBase = (db) => {
        this.setState({
            db: db
        });
    }

    onChangeSearch = (filter) => {
        this.setState({
            filter
        });
    }

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    render() {
        const {db, filter} = this.state;
        return (
            <>
                <Container className={'justify-content-md-center'} fluid={'md'}>

                        <NavList onChangeDataBase={this.onChangeDataBase} onChangeSearch={this.onChangeSearch}/>
                        <DataTree db={db} filter={filter}/>

                </Container>
            </>
        )
    }
}

