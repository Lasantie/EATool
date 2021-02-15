import React, {Component} from 'react';
import {Navbar, Nav, Form} from "react-bootstrap";
import { BrowserRouter, Route, Switch } from "react-router-dom";

export default class NavList extends Component {

    state = {
        items: [{
            id: '1',
            name: 'Applications',
            db: 'Applications'
        }, {
            id: '2',
            name: 'Business processes',
            db: 'BusinessProcesses'
        }, {
            id: '3',
            name: 'Business capabilities',
            db: 'BusinessCapabilities'
        }, {
            id: '4',
            name: 'Organizations',
            db: 'Organizations'
        }],
        searchText: ''
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {searchText} = this.state;
        if (prevState.searchText !== searchText) {
            this.props.onChangeSearch(searchText);
        }
    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            searchText: event.currentTarget.value
        })
    }

    render() {
        const {items, searchText} = this.state;
        const navigation = items.map(({id, db, name}) => {
            return (
                <Nav.Link key={id} href={`#${db}`} onSelect={() => {
                    this.props.onChangeDataBase(db)
                }}>{name}</Nav.Link>

            )
        });
        return (
            <>

                <Navbar sticky="top" bg="dark" variant="dark">
                    <Navbar.Brand href="#home">
                        <span onClick={() => {
                            this.props.onChangeDataBase('')
                        }}>EA Tool</span></Navbar.Brand>
                    <Nav className="mr-auto">
                        {navigation}
                    </Nav>
                    <Form inline={true}>
                        <Form.Control type="text" placeholder="Search" className="mr-sm-2" value={searchText}
                                      onChange={this.handleChange}/>
                    </Form>
                </Navbar>

            </>
        )
    }
}



