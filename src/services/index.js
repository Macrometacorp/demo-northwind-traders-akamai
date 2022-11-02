const BASE_URL = process.env.REACT_APP_GDN_API_URL;
const FABRIC = process.env.REACT_APP_FABRIC_NAME;
const API_KEY = process.env.REACT_APP_API_KEY;

// Hard-coded dummy data
const customers = [
  {
    id: 1,
    name: "Maria Anders",
    title: "Sales Representative",
    companyName: "Alfreds Futterkiste",
    address: "Obere Str. 57",
    city: "Berlin",
    region: "Western Europe",
    country: "Germany",
    postalCode: "12209",
    phone: "30-0074321",
    fax: "030-0076545",
  },
  {
    id: 2,
    name: "Antonio Moreno",
    title: "Owner",
    companyName: "Antonio Moreno Taquería",
    address: "Mataderos 2312",
    city: "México D.F.",
    region: "Central America",
    country: "Mexico",
    postalCode: "05023",
    phone: "(5) 555-3932",
  },
];

const orders = [
  {
    id: 10100,
    customer: {
      id: 1,
      companyName: "Alfreds Futterkiste",
    },
    products: {
      list: [
        {
          id: 1,
          name: "Chai",
          quantity: 20,
          price: 18,
          totalPrice: 342,
          discount: 0.05,
        },
        {
          id: 3,
          name: "Aniseed Syrup",
          quantity: 30,
          price: 10,
          totalPrice: 300,
          discount: 0,
        },
      ],
      differentProductCount: 2,
      totalQuantity: 50,
      totalDiscount: 18,
      totalPrice: 642.0,
    },
    shipping: {
      shippedDate: "2022-10-05",
      requiredDate: "2022-10-08",
      via: "Speedy Express",
      freight: "20.42",
      address: "Obere Str. 57",
      city: "Berlin",
      region: "Western Europe",
      country: "Germany",
      postalCode: "12209",
    },
    createdAt: "2022-09-20",
  },
  {
    id: 20000,
    customer: {
      id: 2,
      companyName: "Antonio Moreno Taquería",
    },
    products: {
      list: [
        {
          id: 11,
          name: "Queso Cabrales",
          quantity: 15,
          price: 21,
          totalPrice: 299.25,
          discount: 0.05,
        },
      ],
      differentProductCount: 1,
      totalQuantity: 15,
      totalDiscount: 15.75,
      totalPrice: 299.25,
    },
    shipping: {
      shippedDate: "2022-09-21",
      requiredDate: "2022-09-30",
      via: "Speedy Express",
      freight: "20.42",
      address: "Mataderos 2312",
      city: "México D.F.",
      region: "Central America",
      country: "Mexico",
      postalCode: "05023",
    },
    createdAt: "2022-10-02",
  },
];

export async function getSuppliers(params) {
  const suppliers = await await invokeFunction("get-suppliers", params);
  // return suppliers

  // Additional temporary call to get document count.
  const totalDocuments = await getDocumentCount("suppliers");
  return {
    totalDocuments,
    data: suppliers,
  };
}

export async function getSupplierById(id) {
  return Promise.resolve({
    _key: "1",
    ContactName: "Charlotte Cooper",
    ContactTitle: "Purchasing Manager",
    CompanyName: "Exotic Liquids",
    Address: "49 Gilbert St.",
    City: "London",
    Region: "British Isles",
    Country: "UK",
    PostalCode: "EC1 4SD",
    Phone: "(171) 555-2222",
  });
}

export async function getProducts(params) {
  const products = await await invokeFunction("get-products", params);
  // return products

  // Additional temporary call to get document count.
  const totalDocuments = await getDocumentCount("products");
  return {
    totalDocuments,
    data: products,
  };
}

export async function getProductById(id) {
  return Promise.resolve({
    _key: "1",
    ProductName: "Chai",
    QuantityPerUnit: "10 boxes x 20 bags",
    UnitPrice: 18,
    UnitsInStock: 39,
    UnitsOnOrder: 0,
    ReorderLevel: 10,
    Discontinued: 0,
    Supplier: {
      _key: 1,
      CompanyName: "Exotic Liquids",
    },
  });
}

export async function getOrders() {
  return Promise.resolve(orders);
}

export async function getOrderById(id) {
  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];

    if (order.id === id) {
      return Promise.resolve(order);
    }
  }

  return Promise.resolve({});
}

export async function getCustomers() {
  return Promise.resolve(customers);
}

export async function getCustomerById(id) {
  for (let i = 0; i < customers.length; i++) {
    const customer = customers[i];

    if (customer.id === id) {
      return Promise.resolve(customer);
    }
  }

  return Promise.resolve({});
}

export async function getEmployees(params) {
  const employees = await invokeFunction("get-employees", params);
  // return employees

  // Additional temporary call to get document count.
  const totalDocuments = await getDocumentCount("employees");
  return {
    totalDocuments,
    data: employees,
  };
}

export async function getEmployeeById(id) {
  return Promise.resolve({
    _key: "1",
    FirstName: "Nancy",
    Title: "Sales Representative",
    TitleOfCourtesy: "Ms.",
    BirthDate: "1980-12-08",
    HomePhone: "(206) 555-9857",
    HireDate: "2020-05-01",
    Extension: "5467",
    Notes:
      "Education includes a BA in psychology from Colorado State University in 1970.",
    Address: "507 - 20th Ave. E. Apt. 2A",
    City: "Seattle",
    Country: "USA",
    PostalCode: "98122",
    ReportsTo: {
      _key: 2,
      FirstName: "Andrew",
      LastName: "Fuller",
    },
  });
}

async function invokeFunction(functionName, { page, pageSize }) {
  const params = {
    offset: (page - 1) * pageSize,
    limit: pageSize,
  };

  const encondedParams = encodeURIComponent(JSON.stringify(params).trim());

  const response = await fetch(
    `${BASE_URL}/_fabric/${FABRIC}/_api/function/invoke/${functionName}?params=${encondedParams}`,
    {
      method: "POST",
      headers: {
        Authorization: `apiKey ${API_KEY}`,
        accept: "application/json",
      },
      body: "",
    }
  );

  const data = await response.json();
  return data;
}

async function getDocumentCount(collectionName) {
  const response = await fetch(
    `${BASE_URL}/_fabric/${FABRIC}/_api/collection/${collectionName}/count`,
    {
      headers: {
        Authorization: `apiKey ${API_KEY}`,
        accept: "application/json",
      },
    }
  );

  const { count } = await response.json();
  return count;
}
