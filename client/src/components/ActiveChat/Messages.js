import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Avatar } from '@material-ui/core';
import { SenderBubble, OtherUserBubble } from '.';
import moment from 'moment';

const useStyles = makeStyles(() => ({
  avatar: {
    height: 20,
    width: 20,
    marginTop: 6,
    marginBottom: 10,
  },
}));

const Messages = (props) => {
  const [firstUnreadMessageId, setFirstUnreadMessageId] = useState(-1);

  const { messages, otherUser, userId, unreadMessageCount } = props;
  useStyles();

  useEffect(() => {
    if ((messages.length === 0)) {
      setFirstUnreadMessageId(-1);
    }
    else if (unreadMessageCount == messages.length) {
      setFirstUnreadMessageId(messages[0].id);
    }
    else {
      setFirstUnreadMessageId(messages[(messages.length - unreadMessageCount)-1].id);
    }
  }, [unreadMessageCount]);

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format('h:mm');
        return message.senderId === userId ? (
          <SenderBubble 
            key={message.id} 
            text={message.text} 
            time={time} 
            addUnreadIndicatorTop={firstUnreadMessageId === messages[0].id && message.id === firstUnreadMessageId} 
            addUnreadIndicatorBottom={firstUnreadMessageId !== messages[0].id && firstUnreadMessageId === message.id } 
            otherUser={otherUser}
            />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser} 
          />
        );
      })
      }
    </Box>
  );
};

export default Messages;
