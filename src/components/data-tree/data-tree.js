import React, {Component} from 'react';
import DataBase from '../../service/data-base';
import {Table} from 'react-bootstrap';

export default class DataTree extends Component {


    constructor(props) {
        super(props);
        this.dataBase = new DataBase();
        this.state = {
            data: [],
            loading: true,
            error: false
        }
    }

    componentDidMount() {
        this.updateDataTree();
    }

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    updateDataTree = () => {
        this.dataBase.getData(this.props.db)
            .then(this.onDataLoaded)
            .catch(this.onError);
    }

    onDataLoaded = (data) => {
        this.setState({
            data,
            loading: false,
            error: false
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    tableTree = (data) => {

        if (data.length === 0) {
            return null;
        }

        const tableHeader = (
            <tr key={'header'}>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
            </tr>
        );

        const tableTreeRows = this.tableTreeRows(data);

        return (
            <>
                <Table striped bordered hover size="sm">
                    <thead>
                    {tableHeader}
                    </thead>
                    {tableTreeRows}
                </Table>
            </>
        )
    }

    tableTreeRows = (data) => {

        const tableBody = data.map(({id, name, description, ...other}, index) => {
            let parentId = '';
            if (other.length > 0) {
                parentId = other[0];
            }
            return (
                <tr key={id} parentid={parentId}
                >
                    <th>{index + 1}</th>
                    <th>{name}</th>
                    <th>{description}</th>
                </tr>
            );
        });

        return (
            <>
                <tbody>
                {tableBody}
                </tbody>
            </>
        )
    }

    render() {

        const {loading, error, data} = this.state;

        console.log(loading, error);

        const errorMessage = error ? <span>ERROR</span> : null;
        const spinner = loading ? <span>Loading</span> : null;
        let content = null;
        if (!(loading || error)) {
            content = this.tableTree(data);
        }
        return (
            <>
                {errorMessage}
                {spinner}
                {content}
            </>
        )
    }
}


