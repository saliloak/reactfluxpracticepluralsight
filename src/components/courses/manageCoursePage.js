"use strict";
var React = require('react');
var Router = require('react-router');
var CourseForm = require('./courseForm');
var CourseApi = require('../../api/courseApi');
var toastr = require('toastr');
var AuthorApi = require('../../api/authorApi');

var ManageCoursePage = React.createClass({
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
            course: {
                id: '',
                title: '',
                length: '',
                category: '',
                watchHref: '',
                author: this.getAllCourseAuthors()
            },
            errors: {
            },
            dirty: false
        };
    },
    componentWillMount: function () {
        var courseId = this.props.params.id;

        if (courseId) {
            this.setState({
                course: CourseApi.getCoursesById(courseId)
            });
        }
    },
    setCourseState: function (event) {
        this.setState({
            dirty: true
        });
        var field = event.target.name;
        var value = event.target.value;
        this.state.course[field] = value;
        return this.setState({
            course: this.state.course
        });
    },
    courseFormIsValid: function () {
        var isFormValid = true;
        this.state.errors = []; // Clear any previous errors
        if (this.state.course.title.length < 3) {
            this.state.errors.title = 'Title cannot be less than 3 characters';
            isFormValid = false;
        }
        if (this.state.course.length.length === 0) {
            this.state.errors.courseLength = 'Course Length is required';
            isFormValid = false;
        }
        if (this.state.course.category.length < 3) {
            this.state.errors.category = 'Course Category cannot be less than 3 characters';
            isFormValid = false;
        }
        if (this.state.course.watchHref.length === 0) {
            this.state.errors.watchHref = 'Course URL cannot be blank';
            isFormValid = false;
        }

        this.setState({
            errors: this.state.errors
        });
        return isFormValid;
    },
    saveCourse: function (event) {
        event.preventDefault();
        if (!this.courseFormIsValid()) {
            return;
        }
        CourseApi.saveCourse(this.state.course);
        this.setState({
            dirty: false
        });
        toastr.success('Course Saved');
        this.transitionTo('courses');
    },
    getAllCourseAuthors: function () {
        var author = AuthorApi.getAllAuthors();
        var result = [];

        function AuthorObject() {
            this.id = '';
            this.name = '';
        }

        for (var i = 0; i < author.length; i++) {
            var res = new AuthorObject();
            res.id = author[i].id;
            res.name = author[i].firstName + " " + author[i].lastName;
            result.push(res);
        }
        return result;
    },
    render: function () {
        return (
            <div>
                <CourseForm courses={this.state.course} onSave={this.saveCourse} onChange={this.setCourseState} errors={this.state.errors} />
            </div>
        );
    }
});

module.exports = ManageCoursePage;