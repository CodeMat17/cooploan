import {
  Box,
  Button,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
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
          <ModalHeader>Liquidate Loan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Text fontWeight='semibold' fontSize='lg'>
                Bank Details
              </Text>
              <Text fontSize='sm'>Account Name:</Text>
              <Text fontSize='sm'>Account Number:</Text>
              <Text fontSize='sm'>Bank Name:</Text>
            </Box>
            <Divider my='4' />
            <Box>
              <Text fontWeight='semibold' fontSize='lg'>
                Liquidate Online
              </Text>
              <Input mt='2' w='full' />
              <Input mt='2' w='full' />
              <Input mt='2' w='full' />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Spacer />
            <Button variant='outline'>Pay Now</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Liquidate;
