import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { VscCloseAll } from "react-icons/vsc";

const Liquidate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Button
        onClick={onOpen}
        color='gray.400'
        leftIcon={<VscCloseAll size='22' />}
        fontSize='sm'
        p='0'
        variant='ghost'>
        Liquidate Loan
      </Button>

      <Modal
        isCentered
        size={["xs", "xs", "sm"]}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text py='6' textAlign='center' fontWeight='semibold'>
              TO LIQUIDATE YOUR LOAN, USE:
            </Text>
            <FormControl mb='2'>
              <FormLabel mb='0' fontSize='sm'>
                Bank Name
              </FormLabel>
              <Text border='1px' px='3' py='1' rounded='md' color='gray.400'>
                Zenith Bank
              </Text>
            </FormControl>
            <FormControl mb='2'>
              <FormLabel mb='0' fontSize='sm'>
                Account Name
              </FormLabel>
              <Text border='1px' px='3' py='1' rounded='md' color='gray.400'>
                Lorem, ipsum dolor.
              </Text>
            </FormControl>
            <FormControl mb='2'>
              <FormLabel mb='0' fontSize='sm'>
                Account Number
              </FormLabel>
              <Text border='1px' px='3' py='1' rounded='md' color='gray.400'>
                0123456789
              </Text>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' onClick={onClose}>
              Done
            </Button>
            {/* <Spacer />
            <Button variant='outline'>Pay Now</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Liquidate;
