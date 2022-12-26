import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  OrderedList,
  Spacer,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LoanForm = ({ session }) => {
  const supabase = useSupabaseClient();
  const user = useUser();

  const toast = useToast();
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [amount, setAmount] = useState("");
  const [file_no, setFileNo] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(` full_name `)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setName(data.full_name);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async () => {
    try {
      setLoading(true);
      console.log(amount, name, file_no);
      const { data, error } = await supabase
        .from("loans")
        .insert([{ amount, name, file_no, user_id: session.user.id }]);

      if (error) {
        throw error;
      }

      if (!error) {
        const { data, error } = await supabase
          .from("profiles")
          .update({ status: "processing" })
          .eq("id", user.id);

        toast({
          title: "Done!",
          description: "Loan application successful",
          status: "success",
          duration: 9000,
          position: "top",
          isClosable: true,
        });
        setAmount("");
        setFileNo("");
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
      router.reload();
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl isRequired={true} mb='4'>
        <FormLabel>Enter amount:</FormLabel>
        <Input
          type='number'
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          w='full'
          placeholder='Min: N5,000 | Max: N50,000'
        />
        {isNaN(amount) && (
          <FormHelperText color='red.500'>
            Hey! your amount should be in figures.
          </FormHelperText>
        )}
        {amount < 5000 && (
          <FormHelperText color='red.500'>
            Mininum loan amount is N5,000
          </FormHelperText>
        )}
        {amount > 50000 && (
          <FormHelperText color='red.500'>
            Maxinum loan amount is N50,000
          </FormHelperText>
        )}
        {amount === "0" && (
          <FormHelperText color='red.500'>
            Amount cannot start with 0
          </FormHelperText>
        )}
      </FormControl>
      <FormControl isRequired={true} mb='6'>
        <FormLabel>Enter File No:</FormLabel>
        <Input
          type='tel'
          value={file_no}
          onChange={(e) => setFileNo(e.target.value)}
          w='full'
          placeholder='Your file no.'
        />
        {file_no.length < 3 && (
          <FormHelperText color='red.500'>Invalid file number</FormHelperText>
        )}
        {file_no.length >= 4 && (
          <FormHelperText color='red.500'>Invalid file number</FormHelperText>
        )}
        {file_no === "000" && (
          <FormHelperText color='red.500'>Invalid file number</FormHelperText>
        )}
      </FormControl>
      {/* <ApplyModal /> */}
      <Button
        disabled={
          amount === "" ||
          amount < 5000 ||
          amount > 50000 ||
          isNaN(amount) ||
          file_no.length < 3 ||
          file_no === "000"
        }
        onClick={onOpen}
        w='full'
        letterSpacing='1px'>
        APPLY
      </Button>

      <Modal
        isCentered
        size={["xs", "sm", "md"]}
        isOpen={isOpen}
        onClose={onClose}
        motionPreset='slideInBottom'
        scrollBehavior='inside'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Terms & Conditions</ModalHeader>
          <ModalCloseButton />
          <ModalBody mb='6'>
            <OrderedList spacing='2'>
              <ListItem>All loans shall be repaid within 3 months.</ListItem>
              <ListItem>
                Loan MUST be liquidated to qualify for another.
              </ListItem>
              <ListItem>
                Loans will be charged 3% monthly for members and 10% for
                non-members.
              </ListItem>
              <ListItem>
                Any default on the monthly repayment shall attract extra 5%
                charges.
              </ListItem>
              <ListItem>
                A default for 3 months, such staff shall be blacklisted and
                charges cumulatively deducted from source.
              </ListItem>
            </OrderedList>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>
              I decline
            </Button>
            <Spacer />
            <Button
              onClick={handleSubmit}
              isLoading={loading}
              variant='outline'>
              I accept
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </form>
  );
};

export default LoanForm;
