import { useEffect, useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { Box, useColorModeValue } from "@chakra-ui/react";

import DataTable from "../../components/DataTable";
import { getSuppliers } from "../../services";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("companyName", {
    header: "Company",
    cell: (info) => {
      return (
        <Link to={`/suppliers/${info.row.original.id}`}>{info.getValue()}</Link>
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

export function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const _getSuppliers = async () => {
      const _suppliers = await getSuppliers();
      setSuppliers(_suppliers);
    };

    _getSuppliers().catch(console.error);
  }, []);

  return (
    <Box p="6" bg={useColorModeValue("white", "gray.800")} rounded="lg">
      <DataTable title="Suppliers" columns={columns} data={suppliers} />
    </Box>
  );
}
