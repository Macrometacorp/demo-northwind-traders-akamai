import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, useColorModeValue } from "@chakra-ui/react";

import MyTable from "../../components/MyTable";
import Pagination from "../../components/Pagination";
import { getProducts } from "../../services";

const columns = [
  {
    Header: "Name",
    accessor: "ProductName",
    Cell: (info) => {
      return (
        <Link to={`/products/${info.row.original._key}`}>{info.value}</Link>
      );
    },
  },
  {
    Header: "Qt per unit",
    accessor: "QuantityPerUnit",
  },
  {
    Header: "Price",
    accessor: "UnitPrice",
    Cell: ({ value }) => {
      return `$${value}`;
    },
  },
  {
    Header: "Stock",
    accessor: "UnitsInStock",
  },
  {
    Header: "Orders",
    accessor: "UnitsOnOrder",
  },
];

export function Products() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [products, setProducts] = useState({
    totalDocuments: 0,
    data: [],
  });

  useEffect(() => {
    const get = async () => {
      const _products = await getProducts({
        page: currentPage,
        pageSize,
      });

      setProducts(_products);
    };

    get().catch(console.error);
  }, [currentPage]);

  return (
    <Box p="6" bg={useColorModeValue("white", "gray.800")} rounded="lg">
      <MyTable title="Products" columns={columns} data={products.data} />
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={products.totalDocuments}
        ItemsPerPage={pageSize}
      />
    </Box>
  );
}
