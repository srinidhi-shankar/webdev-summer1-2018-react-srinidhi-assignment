import React from 'react'
import LessonTabs from './LessonTabs'

export default class ModuleEditor extends React.Component {
    constructor(props) {
        super(props);
        // console.log(this.props.match.params.courseId);
        // console.log(this.props.match.params.moduleId);
    }

    render(){
      return(
          <div>
              <LessonTabs courseId={this.props.match.params.courseId} moduleId={this.props.match.params.moduleId}/>
          </div>
      )
    }
}