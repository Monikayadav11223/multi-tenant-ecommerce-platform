const fs = require('fs');
const path = require('path');

const routesPath = path.join(__dirname, 'backend', 'src', 'routes', 'vendorRoutes.js');
let content = fs.readFileSync(routesPath, 'utf8');

const newImports = `
  getVendorOrders,
  updateVendorOrderStatus,
  getVendorCustomers,
  getVendorAnalytics
`;

content = content.replace("deleteVendorProduct\n} = require('../controllers/vendorController');", "deleteVendorProduct,\n" + newImports + "} = require('../controllers/vendorController');");

const newRoutes = `
// Order Routes
router.route('/orders')
  .get(getVendorOrders);

router.route('/orders/:id')
  .patch(updateVendorOrderStatus);

// Customer Routes
router.route('/customers')
  .get(getVendorCustomers);

// Analytics Routes
router.route('/analytics')
  .get(getVendorAnalytics);
`;

content = content.replace("module.exports = router;", newRoutes + "\nmodule.exports = router;");

fs.writeFileSync(routesPath, content);
console.log('Vendor routes updated');
