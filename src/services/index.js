import suppliers from "./mock-data/suppliers-mock-data.json";

export async function getSuppliers() {
  return Promise.resolve(suppliers);
}

export async function getSupplierById(id) {
  for (let i = 0; i < suppliers.length; i++) {
    const supplier = suppliers[i];

    if (supplier.id === id) {
      return Promise.resolve(supplier)
    }
  }

  return Promise.resolve({})
}
