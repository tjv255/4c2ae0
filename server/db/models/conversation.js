const { Op, Sequelize } = require("sequelize");
const db = require("../db");
const ConversationUser = require("./conversationUser");
const Message = require("./message");
const User = require('./user');

const Conversation = db.define("conversation", {
  unreadMessageCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  }
});



// find between a list of users
// assume no 2 conversations exist with the exact same participants
Conversation.findConversation = async function (userIds) {
  var possibleConversationIds = await ConversationUser.findAll({
    where: {
      userId: userIds
    },
      attributes: ['conversationId'],
      raw: true,
      nest: true,
  });
  possibleConversationIds = possibleConversationIds.map((i)=>(i.conversationId));

  const conversation = await Conversation.findOne({
    where: {"$participants.id$": possibleConversationIds},
    include: [
      {
        model: User,
        as: 'participants',
      },
    ]
  });
  return conversation;
}

Conversation.setUnreadMessageCount = async function (conversationId, senderId) {
  const updatedUnreadMessageCount = await Message.getUnreadMessageCount(conversationId, senderId);
  await Conversation.update(
    { unreadMessageCount: updatedUnreadMessageCount },
    { where: {id: conversationId}, },
  );
  return updatedUnreadMessageCount;
}

module.exports = Conversation;
