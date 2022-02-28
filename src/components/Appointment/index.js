import React from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from '../../hooks/useVisualMode.js';

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRMATION = "CONFIRMATION";
  const EDIT = "EDIT";
  const DELETING = "DELETING";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode( props.interview ? SHOW : EMPTY );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props.bookInterview(props.id,interview)
      .then(() => setTimeout(() => transition(SHOW),1000))
      .catch((err) => setTimeout(() => transition(ERROR_SAVE, true), 1000));

    
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

          transition(DELETING);

          props.cancelInterview(props.id)
            .then(() => setTimeout(() => transition(EMPTY),1000))
            .catch(() => setTimeout(() => transition(ERROR_DELETE, true), 1000));
          
        
        }} onCancel={back} />

      )}
      {mode === EDIT && (

        <Form student={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onCancel={back} onSave={save} />

      )}
      {mode === ERROR_SAVE && <Error message = "Unable to save" onClose={back} />}
      {mode === ERROR_DELETE && <Error message = "Unable to delete" onClose={back} />}

    </article>

  );


};