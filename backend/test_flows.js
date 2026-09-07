const API_URL = 'http://localhost:5000/api';

const runTests = async () => {
  let passCount = 0;
  let failCount = 0;
  let tests = [];

  const logResult = (name, status, reason = '') => {
    console.log(`[${status}] ${name} ${reason ? '- ' + reason : ''}`);
    tests.push({ name, status, reason });
    if (status === 'PASS') passCount++;
    else failCount++;
  };

  const fetchJson = async (url, options = {}) => {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw { status: res.status, data };
    return data;
  };

  try {
    // 1. Customer Registration
    const customerEmail = `customer_${Date.now()}@test.com`;
    let customerToken;
    try {
      const data = await fetchJson(`${API_URL}/auth/register`, {
        method: 'POST',
        body: JSON.stringify({
          name: 'Test Customer',
          email: customerEmail,
          password: 'password123',
          role: 'Customer'
        })
      });
      customerToken = data.token;
      if (customerToken) logResult('Customer Auth', 'PASS');
      else logResult('Customer Auth', 'FAIL', 'No token');
    } catch (e) {
      logResult('Customer Auth', 'FAIL', e.data?.message || e.message);
    }

    // 2. Vendor Registration
    const vendorEmail = `vendor_${Date.now()}@test.com`;
    let vendorToken;
    let storeId;
    try {
      const data = await fetchJson(`${API_URL}/auth/register`, {
        method: 'POST',
        body: JSON.stringify({
          name: 'Test Vendor',
          email: vendorEmail,
          password: 'password123',
          role: 'Vendor',
          storeName: `Test Store ${Date.now()}`
        })
      });
      vendorToken = data.token;
      storeId = data.storeId;
      if (vendorToken && storeId) logResult('Vendor Auth', 'PASS');
      else logResult('Vendor Auth', 'FAIL', 'Missing token or storeId');
    } catch (e) {
      logResult('Vendor Auth', 'FAIL', e.data?.message || e.message);
    }

    // 3. Admin Login (Requires seeding, assume seeded admin exists)
    let adminToken;
    try {
      const data = await fetchJson(`${API_URL}/auth/login`, {
        method: 'POST',
        body: JSON.stringify({
          email: 'admin@multistore.com',
          password: 'password123'
        })
      });
      adminToken = data.token;
      if (adminToken) logResult('Admin Auth', 'PASS');
      else logResult('Admin Auth', 'FAIL', 'No token');
    } catch (e) {
      logResult('Admin Auth', 'FAIL', 'Admin not seeded or incorrect password');
    }

    // 4. Vendor Create Product
    let productId;
    try {
      const data = await fetchJson(`${API_URL}/vendor/products`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${vendorToken}` },
        body: JSON.stringify({
          name: 'Test Product',
          description: 'Testing the product',
          price: 1500,
          category: 'Electronics',
          inventoryCount: 10,
          images: ['https://example.com/img.jpg']
        })
      });
      productId = data._id;
      if (productId) logResult('Products (Vendor Create)', 'PASS');
      else logResult('Products (Vendor Create)', 'FAIL', 'No product ID returned');
    } catch (e) {
      logResult('Products (Vendor Create)', 'FAIL', e.data?.message || e.message);
    }

    // 5. Get Stores (Public)
    try {
      const data = await fetchJson(`${API_URL}/stores`);
      if (Array.isArray(data) && data.length > 0) logResult('Stores (Public)', 'PASS');
      else logResult('Stores (Public)', 'FAIL', 'No stores returned');
    } catch (e) {
      logResult('Stores (Public)', 'FAIL', e.data?.message || e.message);
    }

    // 6. Customer Add to Wishlist
    try {
      const data = await fetchJson(`${API_URL}/customer/wishlist/toggle`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${customerToken}` },
        body: JSON.stringify({ productId })
      });
      if (data.includes(productId)) logResult('Wishlist', 'PASS');
      else logResult('Wishlist', 'FAIL', 'Product not in wishlist');
    } catch (e) {
      logResult('Wishlist', 'FAIL', e.data?.message || e.message);
    }

    // 7. Cart & Checkout (Stripe Init)
    let checkoutUrl;
    try {
      const items = [{
        productId,
        storeId,
        price: 1500,
        quantity: 2
      }];
      const data = await fetchJson(`${API_URL}/payments/create-checkout-session`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${customerToken}` },
        body: JSON.stringify({
          items,
          shippingAddress: {
            fullName: 'Test Customer',
            address: '123 Test St',
            city: 'Test City',
            state: 'TS',
            postalCode: '12345',
            country: 'India',
            phone: '1234567890'
          }
        })
      });
      
      checkoutUrl = data.url;
      if (checkoutUrl) logResult('Checkout (Stripe Init)', 'PASS');
      else logResult('Checkout (Stripe Init)', 'FAIL', 'No checkout URL returned');
    } catch (e) {
      logResult('Checkout (Stripe Init)', 'FAIL', e.data?.message || e.message);
    }

    // 8. Tenant Isolation: Customer tries to access vendor dashboard
    try {
      await fetchJson(`${API_URL}/vendor/analytics`, {
        headers: { Authorization: `Bearer ${customerToken}` }
      });
      logResult('Tenant Isolation', 'FAIL', 'Customer accessed vendor analytics');
    } catch (e) {
      if (e.status === 401 || e.status === 403) {
        logResult('Tenant Isolation', 'PASS');
      } else {
        logResult('Tenant Isolation', 'FAIL', `Unexpected status: ${e.status}`);
      }
    }

    // 9. RBAC: Vendor tries to access admin stats
    try {
      await fetchJson(`${API_URL}/admin/stats`, {
        headers: { Authorization: `Bearer ${vendorToken}` }
      });
      logResult('RBAC', 'FAIL', 'Vendor accessed admin stats');
    } catch (e) {
      if (e.status === 401 || e.status === 403) {
        logResult('RBAC', 'PASS');
      } else {
        logResult('RBAC', 'FAIL', `Unexpected status: ${e.status}`);
      }
    }

  } catch (err) {
    console.error("Critical error in test runner:", err);
  }

  console.log("\n=====================");
  console.log(`TOTAL PASSED: ${passCount}`);
  console.log(`TOTAL FAILED: ${failCount}`);
  console.log("=====================\n");
  console.table(tests);
};

runTests();
