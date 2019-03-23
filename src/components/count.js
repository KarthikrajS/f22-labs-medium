import React from 'react';
import {Badge} from 'react-bootstrap'

class Count extends React.Component {
    render(){
        const {itemArray,completeCount} = this.props;
        return( <div className="card card-body my-3">
            <div><span>Total</span><span className="float-right"><Badge variant="secondary">{itemArray.length}</Badge></span></div>
            <div><span>Active</span><span className="float-right"><Badge variant="secondary">{ itemArray.length - completeCount}</Badge></span></div>
            <div><span>Complete</span><span className="float-right"><Badge variant="secondary">{completeCount}</Badge></span></div>
        </div>);
    }
}

export default Count;