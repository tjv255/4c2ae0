const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }

    const senderId = req.user.id;
    const { recipientId, text, conversationId, receiverHasRead, sender } = req.body;

    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const message = await Message.create({ senderId, text, receiverHasRead, conversationId });
      const updatedUnreadMessageCount =await Conversation.setUnreadMessageCount(conversationId, senderId)

      return res.json({ message, sender, receiverHasRead, updatedUnreadMessageCount });
    }
    else {
      updatedUnreadMessageCount = 1;
    }

    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId,
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      receiverHasRead,
      conversationId: conversation.id,
    });
    res.json({ message, sender, updatedUnreadMessageCount });
  } catch (error) {
    next(error);
  }
});

router.put("/mark-as-read/all", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const { conversationId, } = req.body;
    let  result  = await Message.markAsReadInConvo(
      conversationId,
    );
    Conversation.update(
      {unreadMessageCount: 0},
      {where: {id: conversationId}}
    )
    res.json({result, conversationId});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
