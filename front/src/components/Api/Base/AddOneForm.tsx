import React, { Component, ReactNode } from 'react'
import FormButton from '../../General/Form/FormButton'
import { AiFillCaretDown } from "react-icons/ai";

type Props = {
    children: ReactNode,
    submitted: boolean,
    published: boolean,
    onReset: () => void,
}
type MyState = {
    minimized: boolean
}

class AddOneForm extends Component<Props, MyState> {
    state =  {
        minimized: false
    }
    toggleMimized = (): void => {

        this.setState({
            minimized: !this.state.minimized
        })
    }

    render() {
        return (

            <div  className={`add-one-form ${this.state.minimized ? 'is-minimized': ''}`}>
                <button onClick={this.toggleMimized} className='minimize-btn'>
                    <AiFillCaretDown/>
                </button>
                {this.props.submitted && this.props.published ? (
                    <div className='add-new-prompt'>
                        <h4 className='text--large'>{this.props.published ?
                            'Added successfully!' :
                            'Something went wrong...'
                        }</h4>
                        <FormButton {...{
                            label: 'Add New',
                            onClick: this.props.onReset
                        }}/>
                    </div>
                ) : (
                    this.props.children
                )}
            </div>
        )
    }
}

export default AddOneForm
