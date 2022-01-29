import classes from './people-list.module.css';

export const PeopleListHeader = () => {
  return <header>
    <div className={classes.buttonCol}>
      <button className={classes.btn} name="Add Task"> Add Task</button>
    </div>

    <div className={classes.statusCol}>
      <label> Status </label>
    </div>

    <div className={classes.progressCol}>
      <label> Progress </label>
    </div>

    <div className={classes.datesCol}>
      <label> Dates </label>
    </div>

    <div className={classes.priorityCol}>
      <label> Priority </label>
    </div>

    <div className={classes.iconCol}>
      <i className="icon fa fa-user-o"> </i>
    </div>

  </header>;
};

export default PeopleListHeader;
