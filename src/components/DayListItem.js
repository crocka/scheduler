import React from "react";
import classNames from 'classnames';
import './DayListItem.scss';

export default function DayListItem(props) {

  //format spots for proper English grammar
  const formatSpots = function(pspots) {

    let spots = pspots + ' spots';

    spots = pspots === 1 ? '1 spot' : spots;

    spots = pspots === 0 ? 'no spots' : spots;

    return spots;

  };

  let classes = classNames('day-list__item', {'day-list__item--selected':props.selected, 'day-list__item--full': props.spots === 0});

  return (
    <li data-testid='day' className={classes} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)} remaining</h3>
    </li>
  );
};