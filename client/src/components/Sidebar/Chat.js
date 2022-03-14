import React, { useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import { BadgeAvatar, ChatContent } from '../Sidebar';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: '0 2px 10px 0 rgba(88,133,196,0.05)',
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      cursor: 'grab',
    },
  },
  unreadMessageIndicator: {
    marginRight: 6,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundImage: 'linear-gradient(225deg, #6CC1FF 0%, #3A8DFF 100%)',
    borderRadius: '50px',
    paddingLeft: '7px',
    paddingRight: '7px',
    paddingTop: '2px',
    paddingBottom: '2px',
  }
}));

const Chat = ({ conversation, setActiveChat }) => {
  const classes = useStyles();
  const { otherUser } = conversation;

  const handleClick = async (conversation) => {
    await setActiveChat(conversation.otherUser.username);
  };

  // Returns the count of unread messages in the conversation directed at the user
  const userUnreadMessageCount = () => {
    let i = conversation.messages.length - 1;
    const messages = conversation.messages;
    let count = 0;
    while (i >= 0 && messages[i].senderId == otherUser.id && !messages[i].receiverHasRead) {
      count += 1;
      i -= 1;
    }
    return count;
  }
  const unreadMessageCount = userUnreadMessageCount();

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} />
      {unreadMessageCount > 0 ? (
      <Typography className={classes.unreadMessageIndicator}>
        {userUnreadMessageCount()}
      </Typography>
      ) : '' }
      
      
    </Box>
  );
};

export default Chat;
