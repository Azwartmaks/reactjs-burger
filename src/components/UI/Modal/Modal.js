import React from 'react';
import Auxx from "../../../hoc/Auxx";
import Backdrop from "../Backdrop/Backdrop";

import classes from './Modal.css';
const modal = (props) => (
    <Auxx>
        <Backdrop clicked={props.cancel} show={props.show}/>
        <div className={classes.Modal}
             style = {{
                 transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                 opacity: props.show ? '1' : '0'
             }}>
            {props.children}
        </div>
    </Auxx>

);

export default modal;