"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Header = React.createClass({
    render: function () {
        return (
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="app">PS Administration</Link>
                    </div>
                    <div id="navbar" className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li><Link to="app">Home</Link></li>
                            <li><Link to="authors">Authors</Link></li>
                            <li><Link to="courses">Courses</Link></li>
                            <li><Link to="about">About</Link></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
});

module.exports = Header;