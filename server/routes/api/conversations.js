const router = require("express").Router();
const { User, Conversation, Message } = require("../../db/models");
const { Op, Sequelize } = require("sequelize");
const onlineUsers = require("../../onlineUsers");
const ConversationUser = require("../../db/models/conversationUser");

// get all conversations for a user, include latest message text for preview, and all messages
// include other user model so we have info on username/profile pic (don't include current user info)
router.get("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const curUserId = req.user.id;

    // Find all of the conversations that the user is in
    const conversationUsers = await ConversationUser.findAll({
      where: {
        userId: curUserId
      },
        attributes: ['conversationId'],
        raw: true,
        nest: true,
    })
    const conversationIds = conversationUsers.map((i)=>(i.conversationId))

    const conversations = await Conversation.findAll({
      where: {id: conversationIds},

      attributes: ["id", "unreadMessageCount"],
      order: [[Message, "createdAt", "DESC"]],
      include: [
        {
          model: User,
          as: 'participants',

        },
        { model: Message, order: ["createdAt", "DESC"] },

      ],
    });

    for (let i = 0; i < conversations.length; i++) {
      const convo = conversations[i];
      const convoJSON = convo.toJSON();

      // set a property "otherUser" so that frontend will have easier access
      for (let j=0; j < convo.participants.length; j++) {
        if (convoJSON.participants[j].id != curUserId) {
          convoJSON.otherUser = convoJSON.participants[j];
          // delete convoJSON.participants;
          break;
        }
      }

      // set property for online status of the other user
      if (onlineUsers.includes(convoJSON.otherUser.id)) {
        convoJSON.otherUser.online = true;
      } else {
        convoJSON.otherUser.online = false;
      }

      // set properties for notification count and latest message preview
      convoJSON.latestMessageText = convoJSON.messages[0] ? convoJSON.messages[0].text : '';
      conversations[i] = convoJSON;
    }
    res.json(conversations);
  } catch (error) {
    next(error);
  }
});

router.get("/get-unread-message-count", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    } 
    const conversationId = req.body.conversationId;
    const count = await Conversation.findOne(
      { where: {id: conversationId} },
    )
  } catch (error) {
    next(error);
  }
});

module.exports = router;
