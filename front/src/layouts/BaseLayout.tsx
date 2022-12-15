import React, {Component, ReactNode} from 'react'
import Nav from "../components/General/Nav";

type Props = {
    children: ReactNode,
}

class AddOneForm extends Component<Props> {
    render() {
        return (
            <div className='main'>
                <Nav></Nav>
                { this.props.children}
            </div>
        )
    }
}

export default AddOneForm
