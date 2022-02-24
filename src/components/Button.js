import React from "react";
import classNames from 'classnames';

import "components/Button.scss";

export default function Button(props) {

   let buttonClass = classNames('button', {'button--confirm':props.confirm, 'button--danger': props.danger});

   const clicked = props.onClick;

   return <button disabled = {props.disabled} className={buttonClass} onClick={clicked}>{props.children}</button>;
}
