const { Sequelize } = require("sequelize");
const db = require("../db");
const Conversation = require("./conversation");
const User = require("./user");

const ConversationUser = db.define("conversationUser", {
    // id: {
    //     type: Sequelize.INTEGER,
    //     primaryKey: true,
    //     autoIncrement: true,
    //     allowNull: false,
    // },
    // ConversationId: {
    //     type: Sequelize.INTEGER,
    //     references: {
    //         model: Conversation,
    //         key: 'id',
    //     },
    // },
    // UserId: {
    //     type: Sequelize.INTEGER,
    //     references: {
    //         model: User,
    //         key: 'id',
    //     },
    // },

});

module.exports = ConversationUser;