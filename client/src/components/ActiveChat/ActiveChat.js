import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { Input, Header, Messages } from './index';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexGrow: 8,
    flexDirection: 'column',
  },
  chatContainer: {
    marginLeft: 41,
    marginRight: 41,
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'space-between',
  },
}));

const ActiveChat = ({
  user,
  conversations,
  activeConversation,
  postMessage,
  updateMessageReadStatus,
}) => {

  const classes = useStyles();

  const conversation = conversations
    ? conversations.find(
        (conversation) => conversation.otherUser.username === activeConversation
      )
    : {};

  // Set uread message to read upon opening conversation
  useEffect(() => {
    if (conversation) {
      messageRead();
    }
  }, [activeConversation]);

  function clickedChatWhereNotSender() {
    if (conversation.messages.length == 0)
      return false;
    return conversation.messages[conversation.messages.length-1].senderId !== user.id
  };

  function messageRead() {
    if (clickedChatWhereNotSender()) {
      // User is not the one who sent the last message
      const reqBody = {
        conversationId: conversation.id,
        id: conversation.messages[conversation.messages.length-1].id,
      }
      updateMessageReadStatus(reqBody);
    }
    // else do nothing if the user is the one who sent the message
  }

  const isConversation = (obj) => {
    return obj !== {} && obj !== undefined;
  };

  return (
    <Box key={conversations.className} className={classes.root}>
      {isConversation(conversation) && conversation.otherUser && (
        <>
          <Header
            username={conversation.otherUser.username}
            online={conversation.otherUser.online || false}
          />
          <Box className={classes.chatContainer}>
            {user && (
              <>
                <Messages
                  messages={conversation.messages}
                  otherUser={conversation.otherUser}
                  userId={user.id}
                  messageRead={messageRead}
                />
                <Input
                  otherUser={conversation.otherUser}
                  conversationId={conversation.id || null}
                  user={user}
                  postMessage={postMessage}
                />
              </>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default ActiveChat;
