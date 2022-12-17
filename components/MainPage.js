import { Box } from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import Account from "./Account";
import Loan from "./Loan";
import NavHeader from "./NavHeader";

const MainPage = ({ session }) => {
  const supabase = useSupabaseClient();
  const user = useUser();

  const [editProfile, setEditProfile] = useState(false);
  const [full_name, setFullname] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      //  setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(` full_name`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      //  setLoading(false);
    }
  }

  return (
    <Box w='100%' h='100vh'>
      {full_name === null ? (
        <Account session={session} />
      ) : (
        <>
          <Box bg='blue.700'>
            <NavHeader session={session} />
          </Box>
          <Loan session={session} />
        </>
      )}
    </Box>
  );
};

export default MainPage;
