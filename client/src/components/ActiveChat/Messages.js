import React, { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { SenderBubble, OtherUserBubble } from '.';
import moment from 'moment';

const Messages = (props) => {
  const { messages, otherUser, userId, messageRead } = props;

  // Mark incoming messages from other user as read if the receiver has the conversation open
  useEffect(() => {
    messageRead();
  }, [messages.length]);

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format('h:mm');

        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.receiverHasRead.toString()} time={time} />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.receiverHasRead.toString()}
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
