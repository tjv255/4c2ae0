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
    allowNull: false,
  }
});

Message.findMessage = async function(conversationId, id) {
  const message = await Message.findOne({
    where: { conversationId: conversationId, id: id, }
  });

  return message;
}

Message.updateMessage = async function(conversationId, id) {
  const { result } =await Message.update(
    { receiverHasRead: true },
    { where: {conversationId: conversationId, id: id} }
  )

  let message = await Message.findMessage(
    conversationId,
    id,
  );
  message = message.dataValues;
  return({result, message});
}

module.exports = Message;
