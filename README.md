# Interview Scheduler
The interview scheduler allows students to book and manage an interview with a mentor. Appointments can be made from noon to 5pm for each day of the week. When a request is load, an api request is sent to the server. The appointments are displayed for the selected day. Choosing a different day display different set of appointments. When an appointment is made, user can type in student name and choose an interviewer from the interviewer list. Clicking on the save button will trigger a save action, which make an api request to persist the change. A saving status indicator is shown immediately after clicking on the save button. The a response is received from the server, the status indicator is hidden and the interview is shown with the updated data. The user can edit an interview. This allows them to change the student name or interviewer and save those changes to the server. If an interview is no longer needed, the user can delete the interview. Before the interview is deleted, a confirmation interface is shown to confirm the delete action since it is an destructive action. A deleting status indicator is displayed when the delete request is sent to the api after the user confirms. An empty slot is shown if a successful deleting action is received. If the server returns an error while performing an operation, an error message is shown. The close button on the error message brings the user back to the unchanged interview display interface.

## Setup

Install dependencies with `npm install`.
Require to install version of [scheduler-api](https://github.com/deke76/scheduler-api).

## Dependencies

axios
classnames
normalize.css
react
react-dom
react-scripts

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Screenshots
### Main page with default set to Monday
!["Main page with default set to Monday"](https://github.com/crocka/scheduler/blob/master/docs/mainpage_default_monday.png)
### Switch to a different day
!["Switch to a different day"](https://github.com/crocka/scheduler/blob/master/docs/swtich_to_different_day.png)
### Adding an appointment by click the plus sign
!["Adding an appointment by click the plus sign"](https://github.com/crocka/scheduler/blob/master/docs/adding_appointment_form.png)
### Saving interface
!["Saving interface"](https://github.com/crocka/scheduler/blob/master/docs/saving_interface.png)
### The appointment shows up after adding it
!["The appointment shows up after adding it"](https://github.com/crocka/scheduler/blob/master/docs/after_adding_appointment.png)
### Deleting confimation after clicking trash icon
!["Deleting confimation after clicking trash icon"](https://github.com/crocka/scheduler/blob/master/docs/delete_confirmation.png)
### Deleting interface after delete confirmation
!["Deleting interface after delete confirmation"](https://github.com/crocka/scheduler/blob/master/docs/deleting_interface.png)
