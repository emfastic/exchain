import React, { useContext } from "react";
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
import Context from "../context/index";

const transactions = [
  { id: 1, date: "2022-03-08", description: "Groceries", amount: -80.0 },
  { id: 2, date: "2022-03-07", description: "Gas", amount: -25.0 },
  { id: 3, date: "2022-03-06", description: "Restaurant", amount: -60.0 },
  { id: 4, date: "2022-03-05", description: "Paycheck", amount: 1000.0 },
];

const cards = [
  { id: 1, name: "Chase Freedom", balance: 500.0, limit: 1000.0 },
  { id: 2, name: "Citi Double Cash", balance: 1000.0, limit: 7000.0 },
  { id: 3, name: "American Express Gold", balance: 1500.0, limit: 5000.0 },
];

const creditAccounts = {
  credit: [
    {
      account_id: "lLL6PMeraoFxvb3GA7mjU8lAMm11EMuaywWMD",
      aprs: [
        {
          apr_percentage: 15.24,
          apr_type: "balance_transfer_apr",
          balance_subject_to_apr: 1562.32,
          interest_charge_amount: 130.22,
        },
        {
          apr_percentage: 27.95,
          apr_type: "cash_apr",
          balance_subject_to_apr: 56.22,
          interest_charge_amount: 14.81,
        },
        {
          apr_percentage: 12.5,
          apr_type: "purchase_apr",
          balance_subject_to_apr: 157.01,
          interest_charge_amount: 25.66,
        },
        {
          apr_percentage: 0,
          apr_type: "special",
          balance_subject_to_apr: 1000,
          interest_charge_amount: 0,
        },
      ],
      is_overdue: false,
      last_payment_amount: 168.25,
      last_payment_date: "2019-05-22",
      last_statement_balance: 1708.77,
      last_statement_issue_date: "2019-05-28",
      minimum_payment_amount: 20,
      next_payment_due_date: "2020-05-28",
    },
    {
      account_id: "A3MD8JEKW9X6",
      aprs: [
        {
          apr_percentage: 19.99,
          apr_type: "balance_transfer_apr",
          balance_subject_to_apr: 2040.1,
          interest_charge_amount: 340.5,
        },
        {
          apr_percentage: 21.99,
          apr_type: "cash_apr",
          balance_subject_to_apr: 38.75,
          interest_charge_amount: 8.5,
        },
        {
          apr_percentage: 9.99,
          apr_type: "purchase_apr",
          balance_subject_to_apr: 125.5,
          interest_charge_amount: 10.35,
        },
        {
          apr_percentage: 2.99,
          apr_type: "special",
          balance_subject_to_apr: 500.25,
          interest_charge_amount: 12.5,
        },
      ],
      is_overdue: true,
      last_payment_amount: 50.0,
      last_payment_date: "2022-03-01",
      last_statement_balance: 2100.0,
      last_statement_issue_date: "2022-02-28",
      minimum_payment_amount: 35.0,
      next_payment_due_date: "2022-03-28",
    },
    {
      account_id: "PQDU9LXOW0D4",
      aprs: [
        {
          apr_percentage: 18.99,
          apr_type: "balance_transfer_apr",
          balance_subject_to_apr: 5000.0,
          interest_charge_amount: 790.0,
        },
        {
          apr_percentage: 24.99,
          apr_type: "cash_apr",
          balance_subject_to_apr: 0,
          interest_charge_amount: 0,
        },
        {
          apr_percentage: 15.99,
          apr_type: "purchase_apr",
          balance_subject_to_apr: 1500.0,
          interest_charge_amount: 45.0,
        },
        {
          apr_percentage: 0,
          apr_type: "special",
          balance_subject_to_apr: 250.5,
          interest_charge_amount: 0,
        },
      ],
      is_overdue: false,
      last_payment_amount: 1000.0,
      last_payment_date: "2022-02-15",
      last_statement_balance: 6000.0,
      last_statement_issue_date: "2022-02-28",
      minimum_payment_amount: 50.0,
      next_payment_due_date: "2022-03-28",
    },
    {
      account_id: "G68DFK3J2S1Q",
      aprs: [
        {
          apr_percentage: 10.99,
          apr_type: "balance_transfer_apr",
          balance_subject_to_apr: 750.0,
          interest_charge_amount: 20.61,
        },
        {
          apr_percentage: 19.99,
          apr_type: "cash_apr",
          balance_subject_to_apr: 1225.25,
          interest_charge_amount: 258.34,
        },
        {
          apr_percentage: 16.99,
          apr_type: "purchase_apr",
          balance_subject_to_apr: 865.5,
          interest_charge_amount: 43.51,
        },
        {
          apr_percentage: 0,
          apr_type: "special",
          balance_subject_to_apr: 0,
          interest_charge_amount: 0,
        },
      ],
      is_overdue: true,
      last_payment_amount: 30.0,
      last_payment_date: "2022-03-05",
      last_statement_balance: 1650.0,
      last_statement_issue_date: "2022-02-28",
      minimum_payment_amount: 50.0,
      next_payment_due_date: "2022-03-28",
    },
  ],
};

export default function Dashboard() {
  const {
    itemId,
    accessToken,
    linkToken,
    linkSuccess,
    isItemAccess,
    backend,
    linkTokenError,
    isPaymentInitiation,
  } = useContext<any>(Context);

  function compare(a: any, b: any) {
    if (a["minimum_payment_amount"] > b["minimum_payment_amount"]) return 1;
    else if (a["minimum_payment_amount"] < b["minimum_payment_amount"])
      return -1;
    else return 0;
  }

  function getPossiblePayments(
    accountList: any[],
    totalPayment: number
  ): { payableAccounts: any[]; aprList: any[] } {
    // use total payment to determine optimal payments -> return list of payments to be made
    // start with minimums to increase credit score then pay off highest interest rate
    accountList.sort(compare);
    let payableAccounts: any[] = [];
    let aprList: any[] = [];

    accountList.forEach((account) => {
      if (account["minimum_payment_amount"] <= totalPayment) {
        payableAccounts.push(account);
        totalPayment -= account["minimum_payment_amount"];
        account.aprs.forEach((apr: any) => {
          if (apr.balance_subject_to_apr > 0) {
            aprList.push({
              accountId: account.account_id,
              apr: apr.apr_percentage,
              balance: apr.balance_subject_to_apr,
            });
          }
        });
      }
    });

    aprList.sort((a: any, b: any): number => {
      if (a.apr > b.apr) return -1;
      else if (a.apr < b.apr) return 1;
      else return 0;
    });

    return { payableAccounts: payableAccounts, aprList: aprList };
  }

  console.log(getPossiblePayments(creditAccounts.credit, 1000));

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
