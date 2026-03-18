const Order = require('../models/order');

exports.createOrder = async (req, res) => {
  try {
    const { customer, order } = req.body;
    if (!order.totalAmount) order.totalAmount = order.quantity * order.unitPrice;
    const newOrder = await Order.create({ customer, order });
    return res.status(201).json(newOrder);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const { startDate, endDate, status } = req.query;
    const filter = {};
    if (startDate || endDate) {
      filter.createdAt = {};
      if (startDate) filter.createdAt.$gte = new Date(startDate);
      if (endDate) filter.createdAt.$lte = new Date(new Date(endDate).setHours(23, 59, 59, 999));
    }
    if (status && status !== 'All') filter['order.status'] = status;
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    return res.json(order);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { customer, order } = req.body;
    if (order.quantity && order.unitPrice) order.totalAmount = order.quantity * order.unitPrice;
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      { customer, order },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Order not found' });
    return res.json(updated);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Order not found' });
    return res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
