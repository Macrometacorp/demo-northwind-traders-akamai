import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, useColorModeValue } from "@chakra-ui/react";

import MyTable from "../../components/MyTable";
import Pagination from "../../components/Pagination";
import { getSuppliers } from "../../services";

const columns = [
  {
    Header: "Company",
    accessor: "CompanyName",
    Cell: (info) => {
      return (
        <Link to={`/suppliers/${info.row.original._key}`}>{info.value}</Link>
      );
    },
  },
  {
    Header: "Contact",
    accessor: "ContactName",
  },
  {
    Header: "Title",
    accessor: "ContactTitle",
  },
  {
    Header: "City",
    accessor: "City",
  },
  {
    Header: "Country",
    accessor: "Country",
  },
];

export function Suppliers() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [suppliers, setSuppliers] = useState({
    totalDocuments: 0,
    data: [],
  });

  useEffect(() => {
    const get = async () => {
      const _suppliers = await getSuppliers({
        page: currentPage,
        pageSize,
      });

      setSuppliers(_suppliers);
    };

    get().catch(console.error);
  }, [currentPage]);

  return (
    <Box p="6" bg={useColorModeValue("white", "gray.800")} rounded="lg">
      <MyTable title="Suppliers" columns={columns} data={suppliers.data} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={suppliers.totalDocuments}
        ItemsPerPage={pageSize}
      />
    </Box>
  );
}
