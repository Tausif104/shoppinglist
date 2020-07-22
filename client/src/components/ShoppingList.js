import React, {Component} from 'react';
import {ListGroup, ListGroupItem, Button} from 'reactstrap';
import {connect} from 'react-redux';
import {getItems, deleteItem} from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {

    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }

    componentDidMount() {
        this.props.getItems();
    }

    onDeleteClick = id => {
        this.props.deleteItem(id);
    }

    render() {
        const {items} = this.props.item;
        return (
            <section className="shopping-list">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <ListGroup className='shopping-items-list'>
                                {items.map(({_id, name}) => (
                                    <ListGroupItem key={_id}><span>{name}</span>
                                    {this.props.isAuthenticated ?
                                        <Button 
                                            onClick={
                                                this.onDeleteClick.bind(this, _id)
                                            }
                                            color="danger">Delete
                                        </Button>
                                        :
                                        null
                                    }
                                    </ListGroupItem>
                                ))}
                            </ListGroup>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}



const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {getItems, deleteItem})(ShoppingList);