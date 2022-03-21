const Sequelize = require("sequelize");
const db = require("../db");

const Message = db.define("message", {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  receiverHasRead: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  }
});

Message.findMessage = async function(conversationId, id) {
  const message = await Message.findOne({
    where: { conversationId, id }
  });

  return message;
}

Message.markAsReadInConvo = async function (conversationId) {
  await Message.update(
    { receiverHasRead: true },
    { where: {conversationId} },
  );
  return;
}

Message.getUnreadMessageCount = async function(conversationId, senderId) {
  const result = await Message.findAndCountAll({
    where: {
      receiverHasRead: false,
      conversationId,
      senderId,
    }
  })
  return result.count;
}

module.exports = Message;
