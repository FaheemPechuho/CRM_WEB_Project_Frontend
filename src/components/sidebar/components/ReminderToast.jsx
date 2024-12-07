import { Box, Text } from "@chakra-ui/react";
import { MdAccessAlarms } from "react-icons/md";

const ReminderToast = () => {
  return (
    <Box display={"flex"} flexDir={"column"} alignItems={"center"} justifyContent={"center"} rounded={"md"} py={2} px={4} >
      <Box alignSelf={"flex-start"} class="reminder-container">
        <div class="reminder-line line-1"></div>
        <div class="reminder-line line-2"></div>
        <div class="reminder-line line-3"></div>
        <div class="reminder-line line-4"></div>
      </Box>
      <Box p={4} mb={4} bg={"#ecbf3f"} display={"flex"} alignItems={"center"} justifyContent={"center"} >
        <MdAccessAlarms
          className="bell-ring"
          style={{ color: "white" }}
          size={28}
        />
      </Box>
      <Text textAlign={"center"} mb={4}>
        Follow up le lein mohtaram/mohtaramaan!
      </Text>

      <Box display={"flex"} alignItems={"center"} alignSelf={"flex-end"} textAlign={"right"} justifyContent={"flex-end"} color={"gray"}>
        <small>Reminder</small>
      </Box>
    </Box>
  );
};

export default ReminderToast;
