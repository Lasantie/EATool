import React, {Component} from "react";
import {Modal, Button, Form, Row, Col} from "react-bootstrap";

export default class TableElementWindow extends Component {

    state = {
        changed: false,
        id: undefined,
        name: undefined,
        description: undefined,
        parentId: undefined,
        showModal: false
    }

    componentDidMount() {
        const {item} = this.props;
        this.setState({
            showModal: item.length > 0
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {0: id, 1: name, 2: description, 3: parentId} = {...this.props.item};
        const {0: prevId, 1: prevName, 2: prevDescription, 3: prevParentId} = {...prevProps.item};
        if (id !== prevId || name !== prevName || description !== prevDescription || parentId !== prevParentId) {
            this.setState({
                id,
                name,
                description,
                parentId,
                showModal: true
            })
        }
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo);
    }

    handleChange = (event) => {
        const {id: attribute, value} = event.currentTarget
        if (attribute === 'name') {
            this.setState({
                changed: true,
                name: value
            });
        } else if (attribute === 'description') {
            this.setState({
                changed: true,
                description: value
            });
        } else if (attribute === 'id') {
            this.setState({
                changed: true,
                id: value
            });
        } else if (attribute === 'parentId') {
            this.setState({
                changed: true,
                parentId: value
            });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            changed: false,
            showModal: false
        })
    }

    handleReset = () => {
        this.setState({
            changed: false,
            showModal: false,
        })
    }

    render() {

        const {id, name, description, parentId, changed, showModal} = this.state;

        return (
            <Modal
                size="lg"
                show={showModal}
                onHide={() => this.handleReset()}
                aria-labelledby="table-element-window"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="table-element-window"
                    >
                        {name} {changed ? '*' : ''}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group as={Row} controlId="name">
                            <Form.Label column sm={2}>
                                Name
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" value={name} onChange={this.handleChange}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="description">
                            <Form.Label column sm={2}>
                                Description
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" value={description}
                                              onChange={this.handleChange}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="id">
                            <Form.Label column sm={2}>
                                ID
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" value={id} readOnly
                                              onChange={this.handleChange}/>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} controlId="parentId">
                            <Form.Label column sm={2}>
                                Parent ID
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" value={parentId} readOnly
                                              onChange={this.handleChange}/>
                            </Col>
                        </Form.Group>

                        <Button variant="primary" type='submit' value='Submit'>
                            Save
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

        )
    }
}