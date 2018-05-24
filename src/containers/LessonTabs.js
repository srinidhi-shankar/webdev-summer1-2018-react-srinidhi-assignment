import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import "../services/ModuleService"
import LessonService from "../services/LessonService";

export default class LessonTabs extends React.Component {
    constructor(props) {
        super();
        this.lessonService = LessonService.instance;
        this.findAllLessons = this.findAllLessons.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.lessonInputChange = this.lessonInputChange.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.deleteLessonPrefix = "deleteLesson_";
    }

    componentDidMount() {
        this.findAllLessons(this.props.courseId, this.props.moduleId);
    }

    componentWillReceiveProps(newProps) {
        this.setState({courseId: newProps.courseId, moduleId: newProps.moduleId});
        this.findAllLessons(newProps.courseId, newProps.moduleId)
    }

    findAllLessons(courseId, moduleId) {
        let self = this;
        this.lessonService
            .findAllLessonsForModule(courseId, moduleId)
            .then((lessons) => {
                self.setState({lessons: lessons});
            });
    }

    lessonInputChange(event) {
        console.log(event.target.value);
        this.setState({
            lesson: {title: event.target.value}
        });
    }

    createLesson() {

        console.log(this.props.courseId + " " + this.props.moduleId)
        this.lessonService
            .createLesson(this.props.courseId, this.props.moduleId, this.state.lesson)
            .then(() => {
                this.findAllLessons(this.props.courseId, this.props.moduleId);
            });
    }

    deleteLesson(event) {
        //console.log(event.target.id);
        this.lessonService
            .deleteLesson(event.target.id.replace(this.deleteLessonPrefix, ""))
            .then(() => {
                this.findAllLessons(this.props.courseId, this.props.moduleId);
            });
    }

    renderLessonTabs() {
        let self = this;
        if (this.state != null && this.state.lessons != null) {
            return (
                this.state.lessons.map(function (lesson) {
                    return <li key={lesson.id} className="nav-item">
                        <div className="nav-link active wbdv-black-bg"><a
                            href="#">{lesson.title}</a> <i id={self.deleteLessonPrefix + lesson.id}
                                                           onClick={self.deleteLesson}
                                                           className="fa fa-times wbdv-hand-cursor"/></div>
                    </li>
                })
            );
        }
    }

    render() {
        return (
            <div>
                <ul className="nav nav-pills wbdv-black-bg" role="tablist">
                    {this.renderLessonTabs()}
                    <div>
                        <input onChange={this.lessonInputChange} className="form-control wbdv-reduce-input"
                               placeholder="Lesson"/>

                    </div>
                    <button onClick={this.createLesson} className="btn btn-primary wbdv-reduce-input">Add</button>
                    {/*<li className="nav-item"><a className="nav-link wbdv-reduce-input"*/}
                    {/*href="#"><i className="fa fa-plus"></i></a></li>*/}
                </ul>

            </div>
        );
    }
}
