const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const ConversationUser = require("./conversationUser");

// associations

User.hasMany(Conversation);
// Conversation.belongsTo(User, { as: "user1" });
// Conversation.belongsTo(User, { as: "user2" });

// Conversation.belongsTo(ConversationUser)
Conversation.belongsToMany(User, { through: ConversationUser, as: "participants"});
User.belongsToMany(Conversation, { through: ConversationUser});

Message.belongsTo(Conversation);
Conversation.hasMany(Message);

module.exports = {
  User,
  Conversation,
  Message
};
