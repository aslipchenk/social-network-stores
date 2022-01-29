import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import FriendService from '../../services/friend-service';
import { useLongPoll } from '../../hooks/use-long-poll';
import FriendshipPopup from './friendship-popup';

export const FriendshipRequestBadge = () => {
  const [friendshipList, setFriendshipList] = React.useState([] as any);
  const [displayPopup, setDisplayed] = React.useState(false);
  const pollData = useLongPoll(async () => FriendService.friendShipListPoll({}));
  React.useEffect(() => {
    (async function() {
      const { data } = await FriendService.friendShipList({});
      setFriendshipList(data);
    })();
  }, []);

  React.useEffect(() => {
    if (pollData) {
      setFriendshipList([...friendshipList, pollData]);
    }
  }, [pollData]);

  function handleClick() {
    setDisplayed(!displayPopup);
  }

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={friendshipList.length} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      {displayPopup && <FriendshipPopup friendshipList={friendshipList} />}
    </>
  );
};

export default FriendshipRequestBadge;
