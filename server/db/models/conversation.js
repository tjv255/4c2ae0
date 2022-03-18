const { Op, Sequelize } = require("sequelize");
const db = require("../db");
const Message = require("./message");

const Conversation = db.define("conversation", {
  unreadMessageCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  }
});

// find conversation given two user Ids

Conversation.findConversation = async function (user1Id, user2Id) {
  const conversation = await Conversation.findOne({
    include: {
      model: User,
      as: 'participants',
      where: {
        userId: {
          [Op.or]: [user1Id, user2Id]
        }
      }
    },
    // where: {
    //   user1Id: {
    //     [Op.or]: [user1Id, user2Id]
    //   },
    //   user2Id: {
    //     [Op.or]: [user1Id, user2Id]
    //   }
    // }
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

Conversation.setUnreadMessageCount = async function (conversationId, senderId) {
  const updatedUnreadMessageCount = await Message.getUnreadMessageCount(conversationId, senderId);
  await Conversation.update(
    { unreadMessageCount: updatedUnreadMessageCount },
    { where: {id: conversationId}, },
  );
  return updatedUnreadMessageCount;
}

module.exports = Conversation;
