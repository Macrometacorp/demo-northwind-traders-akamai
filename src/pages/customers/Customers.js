import { useEffect, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { Box, useColorModeValue } from "@chakra-ui/react";

import DataTable from "../../components/DataTable";
import { getCustomers } from "../../services";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("companyName", {
    header: "Company",
    cell: (info) => {
      return (
        <Link to={`/customers/${info.row.original.id}`}>{info.getValue()}</Link>
      );
    },
  }),
  columnHelper.accessor("name", {
    header: "Contact",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("title", {
    header: "Title",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("city", {
    header: "City",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("country", {
    header: "Country",
    cell: (info) => info.getValue(),
  }),
];

export function Customers() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const _getCustomers = async () => {
      const _customers = await getCustomers();
      setCustomers(_customers);
    };

    _getCustomers().catch(console.error);
  }, []);

  return (
    <Box p="6" bg={useColorModeValue("white", "gray.800")} rounded="lg">
      <DataTable title="Customers" columns={columns} data={customers} />
    </Box>
  );
}
