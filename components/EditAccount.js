import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";

const EditAccount = ({ session }) => {
  const supabase = useSupabaseClient();
  const user = useUser();

  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(true);
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
        // setWebsite(data.website);
        setFileno(data.file_no);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ full_name, file_no }) {
    try {
      setLoading(true);

      const updates = {
        id: user.id,
        full_name,
        file_no,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box>
      <Button
        onClick={onOpen}
        color='gray.400'
        leftIcon={<FiEdit size='18' />}
        fontSize='sm'
        p='0'
        variant='ghost'>
        Edit Profile
      </Button>

      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        size={["xs", "xs", "sm"]}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Your Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box mt='8'>
              <FormControl mb='4'>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Input
                  disabled
                  id='email'
                  type='email'
                  value={session.user.email}
                />
              </FormControl>
              <FormControl mb='4'>
                <FormLabel htmlFor='fullname'>Fullname</FormLabel>
                <Input
                  id='fullname'
                  type='text'
                  value={full_name || ""}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </FormControl>

              <FormControl mb='4'>
                <FormLabel htmlFor='file_no'>File No.</FormLabel>
                <Input
                  id='file_no'
                  type='text'
                  value={file_no || ""}
                  onChange={(e) => setFileno(e.target.value)}
                />
              </FormControl>
              {/* <div>
                <Button
                  w='full'
                  mb='4'
                  onClick={() => updateProfile({ full_name, file_no })}
                  disabled={loading}>
                  {loading ? "Loading ..." : "Update"}
                </Button>
              </div> */}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
            <Spacer />
            <Button
              onClick={() => updateProfile({ full_name, file_no })}
              disabled={loading}>
              {loading ? "Loading ..." : "Update"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default EditAccount;
