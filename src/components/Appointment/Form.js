import React, {useState} from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {

  //initialize states
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  //set student, interviewer, and Error to null
  const reset = function() {

    setStudent('');
    setInterviewer(null);
    setError("");

  };

  //cancel function that reset the states and call onCancel props
  const cancel = function() {

    reset();
    props.onCancel();

  }

  //validate function to validate if the student input is blank or not
  function validate() {

    //if student or interviewer are blank, then set the corresponding states
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    } else if (interviewer === null) {
      setError("Interviewer cannot be blank");
      return;
    }
  
    //otherwise, call onSave props
    setError("");
    props.onSave(student, interviewer);
  }

  return (

    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
        value={interviewer}
        interviewers={props.interviewers}
        onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={() => validate()}>Save</Button>
        </section>
      </section>
    </main>

  );

};