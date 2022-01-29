import classes from './friendship-popup.module.css';

const getFriendshipList = (friendshipList: any) => {
  return friendshipList.map((friend: any) => {
    return (
      <div className={classes.content}>
        <img
          src="https://source.unsplash.com/40x40/?indian"
          className={classes.image}
        />
        <div className={classes.addToFriendContainer}>
          <p className={classes.name}>
            {friend.firstName + ' ' + friend.lastName}
          </p>
          <a className={classes.addToFriendButton}>Add to friends +</a>
        </div>
      </div>
    );
  });
};

export const FriendshipPopup = (props: any) => {
  return (
    <div className={classes.container}>
      {getFriendshipList(props.friendshipList)}
    </div>
  );
};

export default FriendshipPopup;
