import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import useVisualMode from '../../hooks/useVisualMode.js';

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRMATION = "CONFIRMATION";
  const EDIT = "EDIT";
  const DELETING = "DELETING";

  const { mode, transition, back } = useVisualMode( props.interview ? SHOW : EMPTY );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id,interview);

    setTimeout(() => transition(SHOW),1000);
  }

  return (

    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRMATION)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (

        <Form interviewers={props.interviewers} onCancel={back} onSave={save} />

      )}
      {mode === SAVING && (

        <Status message={'Saving'} />
      )}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === CONFIRMATION && (

        <Confirm message={"Are you sure you want to delete?"} onConfirm={() => {
          props.cancelInterview(props.id);
          transition(DELETING);
          setTimeout(() => transition(EMPTY),1000);
        
        }} onCancel={back} />

      )}
      {mode === EDIT && (

        <Form student={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onCancel={back} onSave={save} />

      )}
    </article>

  );


};