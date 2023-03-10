import { Box, HStack, Spinner, Tag, Text, VStack } from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import LoanForm from "./LoanForm";

const Loan = ({ session }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [status, setStatus] = useState(null);
  const [amount, setAmount] = useState(null);
  const [updated_at, setUpdatedAt] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      // setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(` amount, status, updated_at`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setStatus(data.status);
        setAmount(data.amount);
        // setDuration(data.duration);
        setUpdatedAt(data.updated_at);
        // setShowCards(false);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      // setLoading(false);
    }
  }

  const handleSubmit = () => {};

  return (
    <Box px='6' py='16' maxW='md' mx='auto'>
      <Text textAlign='center' fontSize='lg' fontWeight='semibold'>
        LOAN STATUS
      </Text>

      {status === "inactive" && (
        <Box>
          {status === "cancelled" && (
            <Text fontSize='sm' color='red.400' textAlign='center'>
              Your loan request was cancelled by an admin.
            </Text>
          )}
          <VStack py='6'>
            <Tag
              px='6'
              py='4'
              bg='green.200'
              color='green.600'
              fontWeight='semibold'
              letterSpacing='1px'>
              INACTIVE
            </Tag>
          </VStack>
          <Text textAlign='center' fontSize='lg' fontWeight='semibold'>
            LOAN APPLICATION FORM
          </Text>
          <Box>
            <Box
              my='2'
              p='4'
              rounded='md'
              border='1px'
              borderColor='gray'
              maxW='xs'
              mx='auto'>
              <LoanForm session={session} />
            </Box>
          </Box>
        </Box>
      )}

      {status === "active" && (
        <VStack py='6'>
          <Tag
            px='6'
            py='4'
            bg='red.200'
            color='red.600'
            fontWeight='semibold'
            letterSpacing='1px'>
            ACTIVE
          </Tag>

          <Text textAlign='center'>
            You are not eligible for loan at the moment. You have an active loan
            of N{amount}, approved on{" "}
            {dayjs(updated_at).format(" MMM D, YYYY h:mm A")}, to pay back in{" "}
            {/* {duration} */}3 months.
          </Text>
        </VStack>
      )}

      {status === "processing" && (
        <VStack py='6'>
          <Tag
            px='6'
            py='4'
            bg='yellow.200'
            color='yellow.600'
            fontWeight='semibold'
            letterSpacing='1px'>
            PROCESSING
          </Tag>

          <Text textAlign='center'>
            Please wait, your loan application is being processed.
          </Text>
        </VStack>
      )}
      {status === "declined" && (
        <VStack py='6'>
          <Tag
            px='6'
            py='4'
            bg='yellow.200'
            color='yellow.600'
            fontWeight='semibold'
            letterSpacing='1px'>
            DECLINED
          </Tag>

          <Text textAlign='center'>
            We cannot process your loan request at the moment. Kindly contact
            the admin for more information.
          </Text>
        </VStack>
      )}

      {status === null && (
        <HStack spacing='4' align='center' justify='center' pt='8'>
          <Spinner size='lg' />
          <Text letterSpacing='1px'>Please wait...</Text>
        </HStack>
      )}
    </Box>
  );
};

export default Loan;
