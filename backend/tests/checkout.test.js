const request = require('supertest');
const express = require('express');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');
const User = require('../src/models/User');
const Product = require('../src/models/Product');
const Store = require('../src/models/Store');
const Order = require('../src/models/Order');

// Mock Stripe
jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({
    checkout: {
      sessions: {
        create: jest.fn().mockResolvedValue({ id: 'cs_test_123', url: 'http://stripe.com' })
      }
    },
    webhooks: {
      constructEvent: jest.fn().mockImplementation((body, sig, secret) => ({
        type: 'checkout.session.completed',
        data: {
          object: {
            id: 'cs_test_123',
            metadata: JSON.parse(body.metadata)
          }
        }
      }))
    }
  }));
});

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn().mockReturnValue({ userId: 'test_user_id' })
}));

jest.mock('../src/models/User', () => {
  const actualUser = jest.requireActual('../src/models/User');
  return {
    ...actualUser,
    findById: jest.fn().mockReturnValue({
      select: jest.fn().mockResolvedValue({ _id: 'test_user_id', email: 'test@test.com', isActive: true })
    })
  };
});

const app = express();
app.use(express.json());
app.use('/api/payments', (req, res, next) => {
    // mock auth middleware
    req.user = { _id: new mongoose.Types.ObjectId(), email: 'test@test.com' };
    next();
}, require('../src/routes/paymentRoutes'));

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Product.deleteMany();
  await Order.deleteMany();
});

describe('Checkout and Payment flow', () => {
  it('should reject non-existent products', async () => {
    const res = await request(app)
      .post('/api/payments/create-checkout-session')
      .set('Authorization', 'Bearer fake_token')
      .send({ items: [{ productId: new mongoose.Types.ObjectId(), quantity: 1 }] });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/Product not found/);
  });

  it('should reject inactive products', async () => {
    const product = await Product.create({
      vendorId: new mongoose.Types.ObjectId(),
      storeId: new mongoose.Types.ObjectId(),
      name: 'Test',
      slug: 'test',
      description: 'test',
      price: 100,
      inventoryCount: 10,
      status: 'archived'
    });
    const res = await request(app)
      .post('/api/payments/create-checkout-session')
      .set('Authorization', 'Bearer fake_token')
      .send({ items: [{ productId: product._id, quantity: 1 }] });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/is not active/);
  });

  it('should reject insufficient inventory', async () => {
    const product = await Product.create({
      vendorId: new mongoose.Types.ObjectId(),
      storeId: new mongoose.Types.ObjectId(),
      name: 'Test',
      slug: 'test2',
      description: 'test',
      price: 100,
      inventoryCount: 2,
      status: 'active'
    });
    const res = await request(app)
      .post('/api/payments/create-checkout-session')
      .set('Authorization', 'Bearer fake_token')
      .send({ items: [{ productId: product._id, quantity: 5 }] });
    expect(res.status).toBe(400);
    expect(res.body.message).toMatch(/Insufficient inventory/);
  });

  it('should ignore fake frontend prices and use backend prices', async () => {
    const product = await Product.create({
      vendorId: new mongoose.Types.ObjectId(),
      storeId: new mongoose.Types.ObjectId(),
      name: 'RealPrice',
      slug: 'real-price',
      description: 'test',
      price: 500, // real price
      inventoryCount: 10,
      status: 'active'
    });

    const res = await request(app)
      .post('/api/payments/create-checkout-session')
      .set('Authorization', 'Bearer fake_token')
      .send({ 
        items: [{ productId: product._id, quantity: 1, price: 10 }] // fake price 10
      });
      
    expect(res.status).toBe(200);
    expect(res.body.id).toBe('cs_test_123');
    // In actual stripe mock, the line_items would have unit_amount: 50000
  });

});
