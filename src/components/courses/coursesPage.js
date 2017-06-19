"use strict";

var React = require('react');
var CourseList = require('./courseList');
var CourseApi = require('../../api/courseApi');
var Link = require('react-router').Link;

var Courses = React.createClass({
    getInitialState: function () {
        var res = CourseApi.getAllCourses();
        return {
            courses: CourseApi.getAllCourses()
        };
    },
    render: function () {
        return (
            <div>
                <h1>Courses</h1>
                <Link to="addCourse" className="btn btn-default">Add Course</Link>
                <CourseList courses={this.state.courses} />
            </div>
        );
    }
});

module.exports = Courses;