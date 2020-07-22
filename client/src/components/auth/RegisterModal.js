import React, {Component} from 'react';
import {  Input, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, NavLink, Nav, Alert } from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {register} from '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';


class RegisterModal extends Component {
    state = {
        modal: false,
        name: '',
        email:'',
        password: '',
        msg: null
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const {error, isAuthenticated} = this.props;
        if(error !== prevProps.error) {
            // check for register error
            if(error.id === 'REGISTER_FAIL') {
                this.setState({msg: error.msg.msg});
            } else {
                this.setState({msg: null})
            }
        }

        // If authenticated close the modal
        if(this.state.modal) {
            if(isAuthenticated) {
                this.toggle();
            }
        }
    }

    toggle= () => {
        // clear errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = e => {
        e.preventDefault();

        const {name, email, password} = this.state;
        // Create user object
        const newUser = {
            name,
            email,
            password
        };

        //Attempt to register
        this.props.register(newUser);

    }

    render() {
        return(
            <div className="form-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="form-inner">
                                <NavLink onClick={this.toggle} href="#">
                                    Register
                                </NavLink>
                                <Modal 
                                    isOpen={this.state.modal}
                                    toggle={this.toggle}
                                    className="register_modal"
                                >
                                    <ModalHeader
                                        toggle={this.toggle}
                                    >
                                        Register
                                    </ModalHeader>
                                    <ModalBody>
                                        {this.state.msg ? ( <Alert color="danger">{this.state.msg}</Alert> ) : null}
                                        <Form onSubmit={this.onSubmit}>
                                        <FormGroup>
                                            <Input 
                                                type="text" 
                                                name="name" 
                                                id="name" 
                                                placeholder="Name" 
                                                onChange={this.onChange}
                                            />
                                            <Input 
                                                type="email" 
                                                name="email" 
                                                id="email" 
                                                placeholder="Email" 
                                                onChange={this.onChange}
                                            />
                                            <Input 
                                                type="password" 
                                                name="password" 
                                                id="password" 
                                                placeholder="Password" 
                                                onChange={this.onChange}
                                            />
                                            <Button
                                                style={{marginTop:'15px'}} 
                                                color="primary"
                                                block
                                            >Register</Button>
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
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, {register,clearErrors})(RegisterModal);