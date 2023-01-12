import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import {useRouter} from 'next/router'

export default function Account({ session }) {
  const supabase = useSupabaseClient();
  const user = useUser();

  const router = useRouter();


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
    <VStack w='full' h='100vh' py='20'>
      <Box
        bg='white'
        color='black'
        px='4'
        rounded='lg'
        py='6'
        w='md'
        maxW={["xs", "xs", "sm"]}>
        <Text
          textAlign='center'
          fontWeight='bold'
          fontSize='xl'
          letterSpacing='1px'>
          Update Your Profile
        </Text>
        <Box w='200px' h='1px' rounded='full' bg='gray' mx='auto'></Box>
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
              border='1px'
              bordercolor='gray'
              onChange={(e) => setFullname(e.target.value)}
            />
          </FormControl>

          <FormControl mb='4'>
            <FormLabel htmlFor='file_no'>File No.</FormLabel>
            <Input
              id='file_no'
              type='text'
              value={file_no || ""}
              border='1px'
              bordercolor='gray'
              onChange={(e) => setFileno(e.target.value)}
            />
          </FormControl>
          <div>
            <Button
              w='full'
              mb='4'
              onClick={() => updateProfile({ full_name, file_no })}
              disabled={loading}>
              {loading ? "Loading ..." : "Update"}
            </Button>
          </div>
          <Button w='full' mb='4' onClick={() => router.reload()}>
            Go Back
          </Button>
        </Box>
      </Box>
    </VStack>
  );
}
