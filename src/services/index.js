// Hard-coded dummy data
const suppliers = [
  {
    id: 1,
    name: "Charlotte Cooper",
    title: "Purchasing Manager",
    companyName: "Exotic Liquids",
    address: "49 Gilbert St.",
    city: "London",
    region: "British Isles",
    country: "UK",
    postalCode: "EC1 4SD",
    phone: "(171) 555-2222",
  },
  {
    id: 5,
    name: "Antonio del Valle Saavedra",
    title: "Export Administrator",
    companyName: "Cooperativa de Quesos 'Las Cabras'",
    address: "Calle del Rosal 4",
    city: "Oviedo",
    region: "Southern Europe",
    country: "Spain",
    postalCode: "33007",
    phone: "(98) 598 76 54",
  },
];

const products = [
  {
    id: 1,
    name: "Chai",
    quantityPerUnit: "10 boxes x 20 bags",
    unitPrice: 18,
    unitsInStock: 39,
    unitsInOrder: 0,
    reorderLevel: 10,
    discontinued: 0,
    supplier: {
      id: 1,
      name: "Exotic Liquids",
    },
  },
  {
    id: 3,
    name: "Aniseed Syrup",
    quantityPerUnit: "12 - 550 ml bottles",
    unitPrice: 10,
    unitsInStock: 13,
    unitsInOrder: 70,
    reorderLevel: 25,
    discontinued: 0,
    supplier: {
      id: 1,
      name: "Exotic Liquids",
    },
  },
  {
    id: 11,
    name: "Queso Cabrales",
    quantityPerUnit: "1 kg pkg.",
    unitPrice: 21,
    unitsInStock: 22,
    unitsInOrder: 30,
    reorderLevel: 30,
    discontinued: 0,
    supplier: {
      id: 5,
      name: "Cooperativa de Quesos 'Las Cabras'",
    },
  },
];

export async function getSuppliers() {
  return Promise.resolve(suppliers);
}

export async function getSupplierById(id) {
  for (let i = 0; i < suppliers.length; i++) {
    const supplier = suppliers[i];

    if (supplier.id === id) {
      return Promise.resolve(supplier);
    }
  }

  return Promise.resolve({});
}

export async function getProducts() {
  return Promise.resolve(products);
}

export async function getProductById(id) {
  for (let i = 0; i < products.length; i++) {
    const product = products[i];

    if (product.id === id) {
      return Promise.resolve(product);
    }
  }

  return Promise.resolve({});
}
