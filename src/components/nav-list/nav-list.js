import React, {Component} from 'react';
import {ButtonGroup, ToggleButton} from "react-bootstrap";


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
        currentItem: '1'
    }

    onChangeCurrentId = (currentItem, db) => {
        this.setState(
            {
                currentItem
            }
        );
        this.props.onChangeDataBase(db);
    }

    render() {
        const {currentItem, items} = this.state;
        const buttons = items.map(({id, db, name}) => {
            return (
                <ToggleButton
                    key={id}
                    type={'radio'}
                    variant={'secondary'}
                    value={id}
                    checked={id === currentItem}
                    onChange={(e) => this.onChangeCurrentId(e.currentTarget.value, db)}> {name}
                </ToggleButton>
            )
        });

        return (
            <ButtonGroup toggle={true}>
                {buttons}
            </ButtonGroup>
        )
    }

}
