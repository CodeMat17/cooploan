import {
  Box,
  Button,
  Flex,
  HStack,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import ColorModeToggle from "./ColorModeToggle";
import EditAccount from "./EditAccount";
import MenuDrawer from "./MenuDrawer";

const NavHeader = ({ session }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [editProfile, setEditProfile] = useState(false);
  const [full_name, setFullname] = useState(null);
  const [file_no, setFileno] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(` full_name, file_no`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setFileno(data.file_no);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      as='nav'
      pos='sticky'
      top='0'
      zIndex='60'
      pl='6'
      pr='2'
      pt='4'
      pb='6'
      maxW='5xl'
      mx='auto'>
      <HStack align='center'>
        <Spacer />
        <HStack spacing='6'>
          <ColorModeToggle />
          <MenuDrawer />
        </HStack>
      </HStack>

      <Text color='white' mt='4' fontSize={["lg", "lg", "xl"]}>
        Welcome!
      </Text>

      <Flex
        pr='4'
        flexDir={["column", "column", "column", "row"]}
        justify='space-between'>
        <Box>
          <VStack align='start' spacing='0'>
            {full_name && (
              <Text
                lineHeight='1'
                color='white'
                fontSize={["2xl", "2xl", "3xl"]}
                fontWeight='semibold'>
                {full_name}
              </Text>
            )}
            <Text color='gray.400'>{session.user.email}</Text>
            {/* {file_no && (
                <Text fontSize='sm' color='gray.400'>
                  {file_no}
                </Text>
              )} */}
            <EditAccount session={session} />
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
};

export default NavHeader;
