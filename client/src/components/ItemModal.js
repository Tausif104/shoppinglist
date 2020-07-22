import React, {Component} from 'react';
import { Alert, Input, Button, Modal, ModalHeader, ModalBody, Form, FormGroup } from 'reactstrap';
import {connect} from 'react-redux';
import {addItem} from '../actions/itemActions';
import PropTypes from 'prop-types';


class ItemModal extends Component {
    state = {
        modal: false,
        name: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    toggle= () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = e => {
        e.preventDefault();

        const newItem = {
            name: this.state.name
        }

        // add item via addItem action
        this.props.addItem(newItem);

        this.toggle();
    }

    render() {
        return(
            <div className="form-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="form-inner">
                                {this.props.isAuthenticated ? 
                                    <Button color="primary" onClick={this.toggle}>
                                        Add Item 
                                    </Button> 
                                    : 
                                    <Alert color="warning">Please Login to Manage Items
                                    </Alert>
                                }
                                <Modal 
                                    isOpen={this.state.modal}
                                    toggle={this.toggle}
                                >
                                    <ModalHeader
                                        toggle={this.toggle}
                                    >
                                        Add To Shopping List
                                    </ModalHeader>
                                    <ModalBody>
                                        <Form onSubmit={this.onSubmit}>
                                        <FormGroup>
                                            <Input 
                                                type="text" 
                                                name="name" 
                                                id="item" 
                                                placeholder="Add Shopping Item" 
                                                onChange={this.onChange}
                                            />
                                            <Button
                                                style={{marginTop:'15px'}} 
                                                color="primary"
                                                block
                                            >Add Item</Button>
                                        </FormGroup>
                                        </Form>
                                    </ModalBody>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {addItem})(ItemModal);