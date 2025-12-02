// src/models/Order.model.js
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            name: String,
            image: String,
            price: Number,
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            subtotal: {                 // ← NEW: each item has its own subtotal
                type: Number,
                required: true
            }
        }
    ],
    subtotal: {
        type: Number,
        required: true
    },
    grandTotal: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "confirmed", "cancelled"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);