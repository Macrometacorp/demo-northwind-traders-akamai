import { useEffect, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { Box, useColorModeValue } from "@chakra-ui/react";

import DataTable from "../../components/DataTable";
import { getOrders } from "../../services";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("id", {
    header: "Id",
    cell: (info) => {
      return (
        <Link to={`/orders/${info.row.original.id}`}>{info.getValue()}</Link>
      );
    },
  }),
  columnHelper.accessor("products.totalPrice", {
    header: "Total Price",
    cell: (info) => `$${info.getValue()}`,
  }),
  columnHelper.accessor("products.differentProductCount", {
    header: "Products",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("products.totalQuantity", {
    header: "Quantity",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("createdAt", {
    header: "Created At",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("customer.companyName", {
    header: "Ship Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("shipping.city", {
    header: "City",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("shipping.country", {
    header: "Country",
    cell: (info) => info.getValue(),
  }),
];

export function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const _getOrders = async () => {
      const _orders = await getOrders();
      setOrders(_orders);
    };

    _getOrders().catch(console.error);
  }, []);

  return (
    <Box p="6" bg={useColorModeValue("white", "gray.800")} rounded="lg">
      <DataTable title="Orders" columns={columns} data={orders} />
    </Box>
  );
}
