import { useEffect, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { Box, useColorModeValue } from "@chakra-ui/react";

import DataTable from "../components/DataTable";
import { getProducts } from "../services";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => {
      return (
        <Link to={`/products/${info.row.original.id}`}>{info.getValue()}</Link>
      );
    },
  }),
  columnHelper.accessor("quantityPerUnit", {
    header: "Qt per unit",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("unitPrice", {
    header: "Price",
    cell: (info) => `$${info.getValue()}`,
  }),
  columnHelper.accessor("unitsInStock", {
    header: "Stock",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("unitsInOrder", {
    header: "Orders",
    cell: (info) => info.getValue(),
  }),
];

export default function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const _getProducts = async () => {
      const _products = await getProducts();
      setProducts(_products);
    };

    _getProducts().catch(console.error);
  }, []);

  return (
    <Box p="6" bg={useColorModeValue("white", "gray.800")} rounded="lg">
      <DataTable title="Products" columns={columns} data={products} />
    </Box>
  );
}
