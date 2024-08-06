const { BodyWithLocale } = require("kernels/rules");

const sampleValidation = {
    index: [
        new BodyWithLocale('title').notEmpty(),
        //other rules goes here
    ],
    create: [
        //rules
    ]
}


module.exports = sampleValidation