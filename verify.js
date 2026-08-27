const baseUrl = 'http://localhost:5000/api';

async function runTests() {
  try {
    console.log("--- Registering Vendor A ---");
    const resA = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Vendor A', email: 'vendora@example.com', password: 'password123', role: 'Vendor', storeName: 'Store A' })
    });
    const vendorA = await resA.json();
    console.log("Vendor A:", vendorA.email, "StoreId:", vendorA.storeId);

    console.log("--- Registering Vendor B ---");
    const resB = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Vendor B', email: 'vendorb@example.com', password: 'password123', role: 'Vendor', storeName: 'Store B' })
    });
    const vendorB = await resB.json();
    console.log("Vendor B:", vendorB.email, "StoreId:", vendorB.storeId);

    console.log("--- Vendor A Creating Product ---");
    const pA = await fetch(`${baseUrl}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${vendorA.token}` },
      body: JSON.stringify({ name: 'Product A', description: 'Desc A', price: 100, inventoryCount: 10 })
    });
    const productA = await pA.json();
    console.log("Product A created with StoreId:", productA.storeId);

    console.log("--- Vendor B Creating Product ---");
    const pB = await fetch(`${baseUrl}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${vendorB.token}` },
      body: JSON.stringify({ name: 'Product B', description: 'Desc B', price: 200, inventoryCount: 5 })
    });
    const productB = await pB.json();
    console.log("Product B created with StoreId:", productB.storeId);

    console.log("--- Vendor A Fetching Own Products ---");
    const myA = await fetch(`${baseUrl}/products/my-products`, {
      headers: { 'Authorization': `Bearer ${vendorA.token}` }
    });
    const myProductsA = await myA.json();
    console.log("Vendor A product count:", myProductsA.length, myProductsA.map(p => p.name));

    console.log("--- Testing RBAC: Customer trying to access Vendor Route ---");
    const resC = await fetch(`${baseUrl}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Customer C', email: 'customerc@example.com', password: 'password123', role: 'Customer' })
    });
    const customerC = await resC.json();
    
    const rbacTest = await fetch(`${baseUrl}/test/vendor`, {
      headers: { 'Authorization': `Bearer ${customerC.token}` }
    });
    const rbacResult = await rbacTest.json();
    console.log("Customer accessing /test/vendor:", rbacTest.status, rbacResult);

    console.log("--- ALL TESTS COMPLETED ---");
  } catch (error) {
    console.error("Test failed:", error);
  }
}

runTests();
