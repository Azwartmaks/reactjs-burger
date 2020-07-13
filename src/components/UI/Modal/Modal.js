import React, { Component } from 'react';
import Auxx from "../../../hoc/Auxx/Auxx";
import Backdrop from "../Backdrop/Backdrop";

import classes from './Modal.css';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.show !== this.props.show || nextProps.loader !== this.props.loader;
    }

    render() {
        return (
            <Auxx>
                <Backdrop clicked={this.props.cancel} show={this.props.show}/>
                <div className={classes.Modal}
                     style = {{
                         transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                         opacity: this.props.show ? '1' : '0'
                     }}>
                    {this.props.children}
                </div>
            </Auxx>
        )
    }
};

export default Modal;