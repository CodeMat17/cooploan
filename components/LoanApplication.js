import {
  Box,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import ApplyForLoan from "./ApplyForLoan";

const LoanApplication = () => {
  const toast = useToast();

  const toastInfo = () => {
    toast({
      title: "Alert!",
      description: "This service is coming soon",
      status: "info",
      duration: 9000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <Box p='6' rounded='3xl' mx='auto'>
      <Tabs isFitted variant='enclosed'>
        <TabList mb='1em'>
          <Tab>Apply For Loan</Tab>
          <Tab>Liquidate Loan</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ApplyForLoan />
          </TabPanel>
          <TabPanel>
            <VStack pt='8' spacing='6'>
              <Text textAlign='center'>Liquidate your loan with the button below</Text>
              <Button
                onClick={toastInfo}
                size='lg' colorScheme='blue'>
                LIQUIDATE
              </Button>
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default LoanApplication;
