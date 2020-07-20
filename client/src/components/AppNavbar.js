import React, {Component} from 'react';

class AppNavbar extends Component {
    render() {
        return(
            <section className="navbar-section">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">                            
                            <nav className="navbar navbar-expand-lg navbar-light">
                                <a className="navbar-brand" href="/">ShoppingList</a>
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarText">
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/features">Features</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/pricing">Pricing</a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default AppNavbar;