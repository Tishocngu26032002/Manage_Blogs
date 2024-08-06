const roleService = require('../services/roleService.js');

let getRoles = async (req, res) => {
    let test = await roleService.getRole();
    console.log(test);
    // console.log(roleService.getRole());
    res.send(test);
}

module.exports = { getRoles }