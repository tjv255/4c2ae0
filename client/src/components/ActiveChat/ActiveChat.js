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
  updateMessageReadOnServer,
  getUnreadMesageCount,
}) => {

  const classes = useStyles();

  const conversation = conversations
    ? conversations.find(
        (conversation) => conversation.otherUser.username === activeConversation
      )
    : {};

  useEffect(() => {
    if (conversation) {
      messagesRead();
    }
  }, [activeConversation]);

  function clickedChatWhereNotSender() {
    if (conversation.messages.length === 0)
      return false;
    return conversation.messages[conversation.messages.length-1].senderId !== user.id
  };

  function messagesRead() {
    if (clickedChatWhereNotSender()) {
      const reqBody = {
        conversationId: conversation.id,
      }
      updateMessageReadOnServer(reqBody);
    }
  }

  const isConversation = (obj) => {
    return obj !== {} && obj !== undefined;
  };

  return (
    <Box className={classes.root}>
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
                  unreadMessageCount={conversation.unreadMessageCount ? conversation.unreadMessageCount : 0}
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
