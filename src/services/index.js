const BASE_URL = process.env.REACT_APP_GDN_API_URL;
const FABRIC = process.env.REACT_APP_FABRIC_NAME;
const API_KEY = process.env.REACT_APP_API_KEY;

export async function getSuppliers({ page, pageSize }) {
  const params = {
    offset: (page - 1) * pageSize,
    limit: pageSize,
  };

  const suppliers = await invokeFunction("get-suppliers", params);
  return suppliers;
}

export async function getSupplierById(id) {
  const supplier = await invokeFunction("get-supplier-info", { key: id });
  return supplier;
}

export async function getProducts({ page, pageSize }) {
  const params = {
    offset: (page - 1) * pageSize,
    limit: pageSize,
  };

  const products = await invokeFunction("get-products", params);
  return products;
}

export async function getProductById(id) {
  const product = await invokeFunction("get-product-info", { key: id });
  return product;
}

export async function getOrders({ page, pageSize }) {
  const params = {
    offset: (page - 1) * pageSize,
    limit: pageSize,
  };

  const orders = await invokeFunction("get-orders", params);
  return orders;
}

export async function getOrderById(id) {
  const order = await invokeFunction("get-order-info", { key: id });
  return order;
}

export async function getCustomers({ page, pageSize }) {
  const params = {
    offset: (page - 1) * pageSize,
    limit: pageSize,
  };

  const customers = await invokeFunction("get-customers", params);
  return customers;
}

export async function getCustomerById(id) {
  const customer = await invokeFunction("get-customer-info", { key: id });
  return customer;
}

export async function getEmployees({ page, pageSize }) {
  const params = {
    offset: (page - 1) * pageSize,
    limit: pageSize,
  };

  const employees = await invokeFunction("get-employees", params);
  return employees;
}

export async function getEmployeeById(id) {
  const employee = await invokeFunction("get-employee-info", { key: id });
  return employee;
}

export async function runSearch(functionName, params) {
  const encodedParams = encodeURIComponent(JSON.stringify(params).trim());

  const response = await fetch(
    `${BASE_URL}/_fabric/${FABRIC}/_api/function/invoke/${functionName}?params=${encodedParams}`,
    {
      method: "POST",
      headers: {
        Authorization: `apiKey ${API_KEY}`,
        accept: "application/json",
      },
      body: "",
    }
  );

  const result = await response.json();
  return result;
}

async function invokeFunction(functionName, params) {
  const encodedParams = encodeURIComponent(JSON.stringify(params).trim());

  const response = await fetch(
    `${BASE_URL}/_fabric/${FABRIC}/_api/function/invoke/${functionName}?params=${encodedParams}`,
    {
      method: "POST",
      headers: {
        Authorization: `apiKey ${API_KEY}`,
        accept: "application/json",
      },
      body: "",
    }
  );

  const result = await response.json();
  return result[0];
}
