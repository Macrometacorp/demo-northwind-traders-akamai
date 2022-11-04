import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Heading,
  Text,
  Stack,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";

function Home() {
  return (
    <div>
      <Stack spacing={6}>
        <Heading>
          <b>Macrometa Northwind Traders Demo</b>
        </Heading>
        <Text noOfLines={3} fontSize="2xl">
          Northwind Traders Access database is a sample database that shipped
          with the Microsoft Office suite in 1997. The Northwind database
          contains sales data for a fictitious company called Northwind Traders,
          which imports and exports specialty foods from around the world.
        </Text>
        {/* <Image
          boxSize='150px'
          objectFit='cover'
          src='/src/northwind.png'
          alt='Northwind Traders DB'
        /> */}
        <Text noOfLines={3} fontSize="2xl">
          Northwind Traders has become a "Hello World" example for any database,
          and this demo shows that we can have that data distributed across more
          than 175 locations globally. Integration with Akamai Edge Workers
          delivers data closer to the users, cutting down latency times.
        </Text>
        <Text noOfLines={3} fontSize="2xl">
          This application architecture enables developers to build truly
          distributed applications with maximum performance worldwide.
          Everything can be built inside Macrometa PaaS. The platform is
          self-serve and you can try it out in our playground.
        </Text>
        <Link
          href="https://play.paas.macrometa.io/"
          fontSize="2xl"
          color={useColorModeValue("primary.500", "primary.200")}
          isExternal
        >
          Macrometa playground <ExternalLinkIcon mx="2px" />
        </Link>
      </Stack>
    </div>
  );
}

export default Home;
