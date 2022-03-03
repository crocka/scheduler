import React from 'react';
import classNames from 'classnames';
import './InterviewerListItem.scss';

export default function InterviewerListItem(props) {

  let classes = classNames('interviewers__item', {

    'interviewers__item--selected': props.selected //add this class when the interviewer is selected

  });

  return (

    <li className={classes} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>

  );

};