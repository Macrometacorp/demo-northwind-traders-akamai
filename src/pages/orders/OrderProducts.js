import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { Box, useColorModeValue } from "@chakra-ui/react";

import DataTable from "../../components/DataTable";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("name", {
    header: "Product",
    cell: (info) => {
      return (
        <Link to={`/products/${info.row.original.id}`}>{info.getValue()}</Link>
      );
    },
  }),
  columnHelper.accessor("quantity", {
    header: "Quantity",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("price", {
    header: "Order Price",
    cell: (info) => `$${info.getValue()}`,
  }),
  columnHelper.accessor("totalPrice", {
    header: "Total Price",
    cell: (info) => `$${info.getValue()}`,
  }),
  columnHelper.accessor("discount", {
    header: "Discount",
    cell: (info) => `${(info.getValue() * 100).toFixed(2)}%`,
  })
];

export function OrderProducts({ data }) {
  console.log(data)
  return (
    <Box mt="6" p="6" bg={useColorModeValue("white", "gray.800")} rounded="lg">
       <DataTable title="Products in Order" columns={columns} data={data} />
    </Box>
  )
}