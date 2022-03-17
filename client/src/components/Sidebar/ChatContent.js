import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles, createTheme, ThemeProvider } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";



const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    // color: "#9CADC8",
    letterSpacing: -0.17,
  },
}));

const bold = createTheme({
  typography: {
    body1: {
      fontWeight: 600,
      color: "#000000",
    },
  }
});

const normal = createTheme({
  typography: {
    body1: {
      color: "#9CADC8",
    },
  }
});

const ChatContent = ({ conversation, unreadMessageExists }) => {
  const classes = useStyles();

  const { otherUser } = conversation;
  const latestMessageText = conversation.id && conversation.latestMessageText;

  return (
    <Box className={classes.root}>
      <Box>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <ThemeProvider theme={unreadMessageExists ? bold : normal}>
          <Typography className={classes.previewText}>
            {latestMessageText}
          </Typography>
        </ThemeProvider>
      </Box>
    </Box>
  );
};

export default ChatContent;
