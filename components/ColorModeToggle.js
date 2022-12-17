import { IconButton, useColorMode } from '@chakra-ui/react'
import { FiSun } from "react-icons/fi";
import { HiMoon } from "react-icons/hi";

const ColorModeToggle = () => {
const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      onClick={toggleColorMode}
      icon={
        colorMode === "dark" ? (
          <FiSun size={25} color='orange' />
        ) : (
          <HiMoon size={25} color='gray' />
        )
      }
      isRound={true}
    />
  );
}

export default ColorModeToggle