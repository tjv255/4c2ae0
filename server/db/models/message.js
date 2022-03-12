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
  const message = Message.findMessage(conversationId, id);
  Message.update(
    { receiverHasRead: true },
    { where: {conversationId: conversationId, id: id} }
  ).then (result => {
      return({result, message});
  }).catch (error => {
    return ({error, message});
  });
}

module.exports = Message;
