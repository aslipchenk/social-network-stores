import * as React from 'react';
import classes from './people-list.module.css';
import AddToFriendButton from './add-to-friend-button';

export default function Human(props: any) {
  const { user } = props;

  return <li className={`${classes.item} ${classes.type1}`}>

    <div className={classes.task}>
      <div className={classes.user}>
        <img src="https://source.unsplash.com/40x40/?indian" alt="Image 001" className="owner-img" />
      </div>
      <div className={classes.name} style={{ width: '150px' }}>
        <div className={classes.text}>{user.firstName}</div>
      </div>
    </div>

    <div className={classes.status}>
      <div className={`${classes.icon} ${classes.off}`}></div>
      <div className={classes.text}> Off Track</div>
    </div>

    <div className={classes.progress}>
      <progress value="15" max="100" />
    </div>

    <div className={classes.dates}>
      <div className={classes.bar}></div>
    </div>

    <div className={classes.priority}>
      <div className={classes.bar}></div>
    </div>
    <AddToFriendButton user={user} />
  </li>;
}
