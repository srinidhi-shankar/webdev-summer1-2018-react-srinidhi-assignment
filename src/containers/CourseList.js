import React from 'react';
import CourseRow from "../components/CourseRow";
import CourseService from "../services/CourseService";

class CourseList extends React.Component {
    constructor() {
        super();
        this.courseService = CourseService.instance;
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    componentDidMount() {
        this.findAllCourses();
    }

    findAllCourses() {
        this.courseService
            .findAllCourses()
            .then((courses) => {
                console.log
                this.setState({courses: courses});
            });
    }

    renderCourseRows() {
        let courses = null;
        let self = this;

        if (this.state) {
            courses = this.state.courses.map(
                function (course) {
                    return <CourseRow key={course.id}
                                      course={course} deleteHandler={self.deleteCourse}/>
                }
            );
        }
        return (
            courses
        )
    }

    titleChanged(event) {
        console.log(this.state);
        this.setState({
            course: {title: event.target.value}
        });
    }

    createCourse() {
        this.courseService
            .createCourse(this.state.course)
            .then(() => {
                this.findAllCourses();
            });
    }

    deleteCourse(courseId) {
        this.courseService.deleteCourse(courseId).then(() => this.findAllCourses());
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-dark bg-primary">
                    <a className="navbar-brand" href="#">Course Manager</a>
                    <form className="form-inline">
                        <input onChange={this.titleChanged}
                               className="form-control" id="titleFld"
                               placeholder="cs101"/>
                        <button type="button" onClick={this.createCourse}
                                className="btn btn-danger">Add
                        </button>
                    </form>
                </nav>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div className="container ">
                            <nav className="navbar col-12">
                                <div className="col-5">Title</div>
                                <div className="col-3">Owned by</div>
                                <div className="col-2">Last modified by me</div>
                                <div className="col-1"><i className="fa fa-th"></i></div>
                                <div className="col-1"><i className="fa fa-sort-alpha-asc"></i> <i
                                    className="fa fa-sort-alpha-desc"></i></div>
                            </nav>
                        </div>
                    </div>
                </nav>

                <div className="container">
                    <table className="table">
                        <tbody>
                        {this.renderCourseRows()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default CourseList;
