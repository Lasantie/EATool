import React, {Component} from 'react';
import DataBase from '../../service/data-base';
import {Table} from 'react-bootstrap';
import Loading from '../loading';
import TableElementWindow from "../table-element-window";
import './data-tree.css';


export default class DataTree extends Component {

    dataBase = new DataBase();
    state = {
        data: [],
        filteredData: [],
        loading: true,
        error: false,
        currentItem: []
    }

    componentDidMount() {
        this.updateDataTree();
    }

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.db !== this.props.db) {
            this.setState({
                loading: true,
                error: false
            })
            this.updateDataTree();
        } else if (prevProps.filter !== this.props.filter) {
            this.onDataLoaded(this.state.data);
        }
    }

    updateDataTree = () => {
        const {db} = this.props;
        if (db === '') {
            this.onDataLoaded([]);
        } else {
            this.dataBase.getData(this.props.db)
                .then(this.onDataLoaded)
                .catch(this.onError);
        }
    }

    onDataLoaded = (data) => {
        const {filter} = this.props;
        const filteredData = data.filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()));
        this.setState({
            data,
            filteredData: filteredData,
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

        const tableBody = data.map((item, index) => {
            const {id, name, description, ...other} = item;
            let parentId = '';
            if (other.length > 0) {
                parentId = other[0];
            }
            return (
                <tr key={id} parentid={parentId} className={'table-tree-row'} onClick={(e) => {
                    e.preventDefault();
                    this.setState({
                        currentItem: [id, name, description, parentId]
                    })
                }}>
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
        const {loading, error, filteredData, currentItem} = this.state;
        const errorMessage = error ? <span>ERROR</span> : null;
        const spinner = loading ? <Loading/> : null;
        let content = null;
        if (!(loading || error)) {
            content = this.tableTree(filteredData);
        }
        return (
            <>
                {errorMessage}
                {spinner}
                {content}
                <TableElementWindow item={currentItem}/>
            </>
        )
    }
}

