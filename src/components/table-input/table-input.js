import React from "react";
import {FormControl} from "react-bootstrap";

const TableInput = ({placeholder = 'enter something', Value= ''}) => {

    return (
        <>
            <FormControl type={'text'} placeholder={placeholder} defaultValue={Value}/>
        </>
    )

}

export default TableInput;