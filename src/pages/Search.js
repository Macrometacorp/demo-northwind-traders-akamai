import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

import { runSavedQuery } from "../services";

const SEARCH_PRODUCT_QUERY = "search-product";
const SEARCH_CUSTOMER_QUERY = "search-customer";

export default function Search() {
  const [keyword, setKeyword] = useState("");
  const [queryName, setQueryName] = useState(SEARCH_PRODUCT_QUERY);
  const [results, setResults] = useState([]);

  const debouncedSetKeyword = debounce(setKeyword, 400);

  const handleRadioChange = (value) => {
    setResults([]);
    setQueryName(value);
  };

  useEffect(() => {
    if (!keyword) {
      setResults([]);
      return;
    }

    const search = async () => {
      const results = await runSavedQuery(queryName, {
        bindVars: {
          keyword: keyword.toLowerCase(),
        },
      });

      setResults(results);
    };
    search().catch(console.error);
  }, [keyword, queryName]);

  return (
    <Box p="6" bg={useColorModeValue("white", "gray.800")} rounded="lg">
      <Heading size="md" mb={4}>
        Search
      </Heading>

      {/* Search Bar */}
      <InputGroup>
        <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
        <Input
          type="text"
          placeholder="Enter keyword..."
          onChange={(e) => {
            debouncedSetKeyword(e.target.value);
          }}
        />
      </InputGroup>

      {/* Collection Options */}
      <Box my={6}>
        <Heading size="sm">Collections</Heading>

        <RadioGroup mt={2} onChange={handleRadioChange} value={queryName}>
          <Stack direction="row" gap={4}>
            <Radio value={SEARCH_PRODUCT_QUERY}>Products</Radio>
            <Radio value={SEARCH_CUSTOMER_QUERY}>Customers</Radio>
          </Stack>
        </RadioGroup>
      </Box>

      {/* Search Results */}
      <Box mt={6}>
        <Heading size="sm">Results</Heading>
        <Box mt={2}>
          {results.length === 0 ? (
            <Text>No results</Text>
          ) : (
            <Flex direction="column">
              {queryName === SEARCH_PRODUCT_QUERY
                ? results.map((product, i) => (
                    <ProductItem key={i} product={product} />
                  ))
                : results.map((customer, i) => (
                    <CustomerItem key={i} customer={customer} />
                  ))}
            </Flex>
          )}
        </Box>
      </Box>
    </Box>
  );
}

function CustomerItem({ customer }) {
  const { _key, CompanyName, ContactName, ContactTitle, Phone } = customer;
  const color = useColorModeValue("primary.500", "primary.200");
  return (
    <Box my={1}>
      <Link to={`/customers/${_key}`}>
        <Text color={color}>{CompanyName}</Text>
      </Link>
      <Text
        fontSize={14}
      >{`Contact: ${ContactName}, Title: ${ContactTitle}, Phone: ${Phone}`}</Text>
    </Box>
  );
}

function ProductItem({ product }) {
  const { _key, ProductName, QuantityPerUnit, UnitPrice, UnitsInStock } =
    product;
  const color = useColorModeValue("primary.500", "primary.200");
  return (
    <Box my={1}>
      <Link to={`/products/${_key}`}>
        <Text color={color}>{ProductName}</Text>
      </Link>
      <Text>{`Quantity per Unit: ${QuantityPerUnit}, Price: $${UnitPrice}, Stock: ${UnitsInStock}`}</Text>
    </Box>
  );
}

function debounce(callback, wait) {
  let timeoutId = null;
  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}
