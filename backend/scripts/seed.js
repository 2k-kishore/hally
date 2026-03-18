const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Order = require('../models/order');

dotenv.config();

const orders = [
  {
    customer: {
      firstName: 'Michael',
      lastName: 'Harris',
      email: 'michael.h@example.com',
      phone: '+1 555-0101',
      streetAddress: '123 Fiber St',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94107',
      country: 'United States'
    },
    order: {
      product: 'Fiber Internet 1 Gbps',
      quantity: 1,
      unitPrice: 89.99,
      totalAmount: 89.99,
      status: 'Completed',
      createdBy: 'Mr. Michael Harris',
      orderDate: new Date('2026-03-01')
    }
  },
  {
    customer: {
      firstName: 'Ryan',
      lastName: 'Cooper',
      email: 'r.cooper@example.com',
      phone: '+1 555-0102',
      streetAddress: '456 Mobile Way',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'United States'
    },
    order: {
      product: '5G Unlimited Mobile Plan',
      quantity: 2,
      unitPrice: 59.99,
      totalAmount: 119.98,
      status: 'In Progress',
      createdBy: 'Mr. Ryan Cooper',
      orderDate: new Date('2026-03-05')
    }
  },
  {
    customer: {
      firstName: 'Olivia',
      lastName: 'Carter',
      email: 'olivia.c@example.com',
      phone: '+1 555-0103',
      streetAddress: '789 Business Ave',
      city: 'Toronto',
      state: 'ON',
      postalCode: 'M5V 2L7',
      country: 'Canada'
    },
    order: {
      product: 'Business Internet 500 Mbps',
      quantity: 1,
      unitPrice: 149.99,
      totalAmount: 149.99,
      status: 'Pending',
      createdBy: 'Ms. Olivia Carter',
      orderDate: new Date('2026-03-10')
    }
  },
  {
    customer: {
      firstName: 'Lucas',
      lastName: 'Martin',
      email: 'l.martin@example.com',
      phone: '+61 555-0104',
      streetAddress: '101 Corporate Blv',
      city: 'Sydney',
      state: 'NSW',
      postalCode: '2000',
      country: 'Australia'
    },
    order: {
      product: 'VoIP Corporate Package',
      quantity: 5,
      unitPrice: 199.99,
      totalAmount: 999.95,
      status: 'Completed',
      createdBy: 'Mr. Lucas Martin',
      orderDate: new Date('2026-03-15')
    }
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');
    
    await Order.deleteMany();
    console.log('Cleared existing orders.');
    
    await Order.insertMany(orders);
    console.log('Successfully seeded database with 4 orders.');
    
    process.exit();
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedDB();
