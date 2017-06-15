"use strict";

var React = require('react');
var Router = require('react-router');
var AuthorForm = require('./authorForm');
var AuthorActions = require('../../actions/authorActions');
var AuthorStore = require('../../stores/authorStore');
var toastr = require('toastr');

var ManageAuthorPage = React.createClass({
    mixins: [
        Router.Navigation
    ],
    statics: {
        willTransitionFrom: function (transition, component) {
            if (component.state.dirty && !confirm('Leaving without saving ?')) {
                transition.abort();
            }
        }
    },
    getInitialState: function () {
        return {
            author: {
                id: '',
                firstName: '',
                lastName: ''
            },
            errors: {

            },
            dirty: false
        };
    },
    componentWillMount: function () {
        var authorId = this.props.params.id;

        if (authorId) {
            this.setState({
                author: AuthorStore.getAuthorById(authorId)
            });
        }
    },
    setAuthorState: function (event) {
        this.setState({
            dirty: true
        });
        var field = event.target.name;
        var value = event.target.value;
        this.state.author[field] = value;
        return this.setState({
            author: this.state.author
        });
    },
    authorFormIsValid: function () {
        var isFormValid = true;
        this.state.errors = []; // Clear any previous errors
        if (this.state.author.firstName.length < 3) {
            this.state.errors.firstName = 'First name should be atleast 3 characters';
            isFormValid = false;
        }
        if (this.state.author.lastName.length < 3) {
            this.state.errors.lastName = 'Last name should be atleast 3 characters';
            isFormValid = false;
        }

        this.setState({
            errors: this.state.errors
        });
        return isFormValid;
    },
    saveAuthor: function (event) {
        event.preventDefault();
        if (!this.authorFormIsValid()) {
            return;
        }

        if (this.state.author.id) {
            AuthorActions.updateAuthor(this.state.author);
        }
        else {
            AuthorActions.createAuthor(this.state.author);
        }
        this.setState({
            dirty: false
        });
        toastr.success('Author Saved');
        this.transitionTo('authors');
    },
    render: function () {
        return (
            <div>
                <AuthorForm author={this.state.author} onChange={this.setAuthorState} onSave={this.saveAuthor} errors={this.state.errors} />
            </div>
        );
    }
});

module.exports = ManageAuthorPage;