import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
import FriendService from '../../services/friend-service';

export const AddToFriendButton = (props: any) => {
  async function handleAddFriend() {
    await FriendService.createFriendship({ approveUser: props.user.id });
  }

  return <IconButton onClick={handleAddFriend}>
    <AddIcon />
  </IconButton>;
};

export default AddToFriendButton;
