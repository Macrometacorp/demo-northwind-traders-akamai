import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

export default function DetailCard({ title, data, goBackPath }) {
  return (
    <Box p={6} bg={useColorModeValue("white", "gray.800")} rounded="lg">
      <Heading size="md" mb={6}>
        {title}
      </Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap="4">
        {data.map(({ label, value, linkTo }, i) => (
          <GridItem key={i}>
            <Text fontWeight="bold">{label}</Text>
            {linkTo ? (
              <Link to={linkTo}>
                <Text>{value}</Text>
              </Link>
            ) : (
              <Text>{value}</Text>
            )}
          </GridItem>
        ))}
      </Grid>
      <Flex justify="flex-start" align="center" mt={6}>
        {goBackPath ? (
          <Link to={goBackPath}>
            <Button colorScheme={"gray"}>Go Back</Button>
          </Link>
        ) : null}
      </Flex>
    </Box>
  );
}
