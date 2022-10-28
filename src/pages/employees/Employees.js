import { useEffect, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { Box, useColorModeValue } from "@chakra-ui/react";

import DataTable from "../../components/DataTable";
import { getEmployees } from "../../services";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => {
      return (
        <Link to={`/employees/${info.row.original.id}`}>{info.getValue()}</Link>
      );
    },
  }),
  columnHelper.accessor("title", {
    header: "Title",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("address.city", {
    header: "City",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("homePhone", {
    header: "Phone",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("address.country", {
    header: "Country",
    cell: (info) => info.getValue(),
  }),
];

export function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const _getEmployees = async () => {
      const _employees = await getEmployees();
      setEmployees(_employees);
    };

    _getEmployees().catch(console.error);
  }, []);

  return (
    <Box p="6" bg={useColorModeValue("white", "gray.800")} rounded="lg">
      <DataTable title="Employees" columns={columns} data={employees} />
    </Box>
  );
}
