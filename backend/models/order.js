const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: {
    firstName:     { type: String, required: true, trim: true },
    lastName:      { type: String, required: true, trim: true },
    email:         { type: String, required: true, trim: true, lowercase: true },
    phone:         { type: String, required: true },
    streetAddress: { type: String, required: true },
    city:          { type: String, required: true },
    state:         { type: String, required: true },
    postalCode:    { type: String, required: true },
    country: {
      type: String,
      required: true,
      enum: ['United States', 'Canada', 'Australia', 'Singapore', 'Hong Kong'],
      default: 'United States',
    },
  },
  order: {
    product: {
      type: String,
      required: true,
      enum: ['Fiber Internet 300 Mbps', '5G Unlimited Mobile Plan', 'Fiber Internet 1 Gbps', 'Business Internet 500 Mbps', 'VoIP Corporate Package'],
    },
    quantity:    { type: Number, required: true, min: 1, default: 1 },
    unitPrice:   { type: Number, required: true, min: 0 },
    totalAmount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      required: true,
      enum: ['Pending', 'In Progress', 'Completed'],
      default: 'Pending',
    },
    createdBy: {
      type: String,
      required: true,
      enum: ['Mr. Michael Harris', 'Mr. Ryan Cooper', 'Ms. Olivia Carter', 'Mr. Lucas Martin'],
    },
    orderDate: { type: Date, default: Date.now },
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
