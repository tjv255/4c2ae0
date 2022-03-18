const { Sequelize } = require("sequelize");
const db = require("../db");
const Conversation = require("./conversation");
const User = require("./user");

const ConversationUser = db.define("conversationUser", { });

module.exports = ConversationUser;