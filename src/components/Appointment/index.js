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

  //search for dayIndex according to the name of the day
  const dayIndex = {"Monday": 0, "Tuesday" : 1, "Wednesday" : 2, "Thursday" : 3, "Friday" : 4};

  //custom hook to control the display interface
  const { mode, transition, back } = useVisualMode( props.interview ? SHOW : EMPTY );

  //save when the save button is clicked
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING, true);

    props.bookInterview(props.id,interview, dayIndex[props.day])
      .then(() => setTimeout(() => transition(SHOW),1000))// setTimeout used to exaggerate the show interface
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

          //transition to deleting interface
          transition(DELETING, true);

          props.cancelInterview(props.id, dayIndex[props.day])
            .then(() => setTimeout(() => transition(EMPTY),1000))// setTimeout used to exaggerate the deleting interface
            .catch(() => setTimeout(() => transition(ERROR_DELETE, true), 1000));// setTimeout used to exaggerate the deleting interface
          
        
        }} onCancel={back} />

      )}
      {mode === EDIT && (

        <Form student={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onCancel={back} onSave={save} />

      )}
      {mode === ERROR_SAVE && <Error message = "Unable to save appointment" onClose={back} />}
      {mode === ERROR_DELETE && <Error message = "Unable to cancel appointment" onClose={back} />}

    </article>

  );


};