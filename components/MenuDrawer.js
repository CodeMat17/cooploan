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

const MenuDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const supabase = useSupabaseClient();

  return (
    <Box>
      <IconButton
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
            <VStack align='start' mb='12'>
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