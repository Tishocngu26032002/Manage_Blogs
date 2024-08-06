const db = require('../../../models/index.js');

const getRole = async () => {
    try {
        let role = await db.Role.findAll({
            include: [
                { model: db.User }
            ]
        });
        console.log("tesst role nef: 1");
        return JSON.stringify(role);
    }
    catch (error) {
        console.log("warning!!!!!", error);
    }
}

module.exports = { getRole }