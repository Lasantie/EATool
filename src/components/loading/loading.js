import React from 'react';
import {Container, Spinner} from 'react-bootstrap'

const Loading = () => {

    return (
        <Container fluid={true}>
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </Container>
    )

}

export default Loading;