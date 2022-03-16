import React, { useEffect } from 'react';
import { Badge, Box, Typography } from '@material-ui/core';
import { BadgeAvatar, ChatContent } from '../Sidebar';
import { makeStyles } from '@material-ui/core/styles';

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

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent conversation={conversation} />
      {conversation.unreadMessageCount > 0 && conversation.messages[conversation.messages.length-1].senderId === conversation.otherUser.id ? (
      <Badge className={classes.unreadMessageIndicator}>
        {conversation.unreadMessageCount}
      </Badge>
      ) : '' }
      
      
    </Box>
  );
};

export default Chat;
