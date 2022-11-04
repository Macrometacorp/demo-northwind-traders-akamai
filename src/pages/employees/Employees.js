import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, useColorModeValue } from "@chakra-ui/react";

import MyTable from "../../components/MyTable";
import Pagination from "../../components/Pagination";
import { getEmployees } from "../../services";

const columns = [
  {
    Header: "Name",
    accessor: "FirstName",
    Cell: (info) => {
      return (
        <Link
          to={`/employees/${info.row.original._key}`}
        >{`${info.value} ${info.row.original.LastName}`}</Link>
      );
    },
  },
  {
    Header: "Title",
    accessor: "Title",
  },
  {
    Header: "City",
    accessor: "City",
  },
  {
    Header: "Phone",
    accessor: "HomePhone",
  },
  {
    Header: "Country",
    accessor: "Country",
  },
];

export function Employees() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [employees, setEmployees] = useState({
    totalDocuments: 0,
    data: [],
  });

  useEffect(() => {
    const get = async () => {
      const _employees = await getEmployees({
        page: currentPage,
        pageSize,
      });

      setEmployees(_employees);
    };

    get().catch(console.error);
  }, [currentPage]);

  return (
    <Box p="6" bg={useColorModeValue("white", "gray.800")} rounded="lg">
      <MyTable title="Employees" columns={columns} data={employees.data} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={employees.totalDocuments}
        ItemsPerPage={pageSize}
      />
    </Box>
  );
}
