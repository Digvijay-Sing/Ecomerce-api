const mongoose = require('mongoose');
const schema = mongoose.Schema;

const cartItemSchema = new schema({
    product: {
        type: schema.ObjectId,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    }
});

const cartSchema = new schema({
    user: {
        type: schema.ObjectId,
        required: true,
        unique: true
    },
    items: [cartItemSchema]
});

const cartModel = mongoose.model('Cart', cartSchema);


module.exports = cartModel;