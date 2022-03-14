import React, { useEffect } from 'react';
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
  const { messages, otherUser, userId, messageRead } = props;
  const classes = useStyles();

  // Mark incoming messages from other user as read if the receiver has the conversation open
  useEffect(() => {
    messageRead();
  }, [messages.length]);

  // Returns the count of unread messages in the conversation directed at the other user
  const otherUserFirstUnreadMessageId = () => {
    let i = messages.length - 1;
    if (i >= 0) {
      while (i >= 0 && messages[i].senderId == userId && !messages[i].receiverHasRead) {
        i -= 1;
      }
      if (i == -1) return -1;
      return messages[i].id;
    }
    else {
      return -1;
    }
  }
  const unreadMessageId = otherUserFirstUnreadMessageId();

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format('h:mm');

        return message.senderId === userId ? (
          <SenderBubble 
            key={message.id} 
            text={message.text} 
            time={time} 
            addUnreadIndicatorTop={unreadMessageId === -1 && message.id == messages[0].id} 
            addUnreadIndicatorBottom={unreadMessageId === message.id} 
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
