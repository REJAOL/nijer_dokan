// src/controllers/order.js
const Order = require('../models/Order.model.js');
const Product = require('../models/Product.model.js');

// Create Order
const createOrder = async (req, res) => {
    try {
        const { userId, items } = req.body;

        if (!userId || !items || items.length === 0) {
            return res.status(400).json({
                message: "User ID and items are required"
            });
        }

        let subtotal = 0;
        const orderItems = [];

        for (let item of items) {
            const product = await Product.findById(item.productId);

            if (!product) {
                return res.status(404).json({
                    message: `Product not found: ${item.productId}`
                });
            }

            if (product.quantity < item.qty) {
                return res.status(400).json({
                    message: `Not enough stock for ${product.name}`
                });
            }

            const itemSubtotal = product.price * item.qty;   // ← calculate per item
            subtotal += itemSubtotal;

            orderItems.push({
                product: product._id,
                name: product.name,
                image: product.image,
                price: product.price,
                quantity: item.qty,
                subtotal: itemSubtotal                     // ← save per item subtotal
            });

            // Reduce stock
            product.quantity -= item.qty;
            await product.save();
        }

        const order = await Order.create({
            user: userId,
            items: orderItems,
            subtotal: subtotal,
            grandTotal: subtotal
        });

        res.status(201).json({
            success: true,
            message: "Order created successfully",
            order
        });

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};

// Get all orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email phone')
            .populate('items.product', 'name price image')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching orders",
            error: error.message
        });
    }
};

// Get single order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email')
            .populate('items.product');

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({
            success: true,
            order
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById
};