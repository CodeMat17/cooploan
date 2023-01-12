import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdCall } from "react-icons/md";
import { RiMailSendFill } from "react-icons/ri";
import { BsWhatsapp } from 'react-icons/bs'

const MenuDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const supabase = useSupabaseClient();

  return (
    <Box>
      <IconButton
        mr='2'
        onClick={onOpen}
        size='lg'
        isRound
        icon={<HiMenuAlt3 size={32} />}
      />

      <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>COOPLoan</DrawerHeader>

          <DrawerBody py='16'>
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
            <VStack align='start' my='12'>
              <Text>Contact Admin</Text>
              <HStack spacing='6'>
                {/* <Link href=''> */}
                <IconButton
                  onClick={onClose}
                  icon={<MdCall size={22} />}
                  isRound
                  size='lg'
                />
                {/* </Link> */}

                {/* <Link href=''> */}
                <IconButton
                  onClick={onClose}
                  icon={<RiMailSendFill size={22} />}
                  isRound
                  size='lg'
                />
                {/* </Link> */}
                <IconButton
                  onClick={onClose}
                  icon={<BsWhatsapp size={22} />}
                  isRound
                  size='lg'
                />
              </HStack>
            </VStack>
          </DrawerBody>

          <DrawerFooter justifyContent='start'>
            <Button w='full' mb='4' onClick={() => supabase.auth.signOut()}>
              Sign Out
            </Button>
            {/* <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button> */}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default MenuDrawer;
