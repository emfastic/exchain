import {
  Box,
  Flex,
  Heading,
  Text,
  Badge,
  Divider,
  Icon,
} from "@chakra-ui/react";
import { FiCreditCard } from "react-icons/fi";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

const transactions = [
  { id: 1, date: "2022-03-08", description: "Groceries", amount: -80.0 },
  { id: 2, date: "2022-03-07", description: "Gas", amount: -25.0 },
  { id: 3, date: "2022-03-06", description: "Restaurant", amount: -60.0 },
  { id: 4, date: "2022-03-05", description: "Paycheck", amount: 1000.0 },
];

const cards = [
  { id: 1, name: "Chase Freedom", balance: 500.0 },
  { id: 2, name: "Citi Double Cash", balance: 1000.0 },
  { id: 3, name: "American Express Gold", balance: 1500.0 },
];

export default function Dashboard() {
  return (
    <Box p="6">
      <Heading mb="6">Dashboard</Heading>
      <Flex justifyContent="space-between">
        {cards.map((card) => (
          <Box
            key={card.id}
            border="1px"
            borderColor="gray.200"
            borderRadius="md"
            p="4"
          >
            <Flex justifyContent="space-between">
              <Text fontSize="sm" fontWeight="medium" color="gray.500">
                {card.name}
              </Text>
              <Icon as={FiCreditCard} boxSize="5" color="gray.500" />
            </Flex>
            <Text fontSize="2xl" fontWeight="bold" mt="2">
              ${card.balance.toFixed(2)}
            </Text>
          </Box>
        ))}
      </Flex>
      <Divider my="6" />
      <Box>
        <Flex justifyContent="space-between" alignItems="center" mb="2">
          <Heading size="md">Recent Transactions</Heading>
          <Badge variant="solid" colorScheme="purple">
            See All
          </Badge>
        </Flex>
        {transactions.map((transaction) => (
          <Flex key={transaction.id} justifyContent="space-between" mb="2">
            <Box>
              <Text fontSize="sm" fontWeight="medium">
                {transaction.description}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {transaction.date}
              </Text>
            </Box>
            <Box>
              <Text
                fontSize="sm"
                fontWeight="medium"
                color={transaction.amount > 0 ? "green.500" : "red.500"}
              >
                {transaction.amount > 0 ? "+" : "-"}$
                {Math.abs(transaction.amount).toFixed(2)}
              </Text>
              {transaction.amount > 0 ? (
                <Icon as={IoMdArrowDropup} boxSize="4" color="green.500" />
              ) : (
                <Icon as={IoMdArrowDropdown} boxSize="4" color="red.500" />
              )}
            </Box>
          </Flex>
        ))}
      </Box>
    </Box>
  );
}
