// chakra imports
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
//   Custom components
import Brand from "components/sidebar/components/Brand";
import Links from "components/sidebar/components/Links";
import React from "react";

// FUNCTIONS

function SidebarContent(props) {
  const { routes, setOpenSidebar, openSidebar, from, largeLogo } = props;
  // SIDEBAR
  return (
    <Flex className="mt-4" direction="column" height="100%" borderRadius="30px">
      <Brand
        from={from}
        largeLogo={largeLogo}
        openSidebar={openSidebar}
        setOpenSidebar={setOpenSidebar}
      />
      <Stack direction="column" mb="auto">
        <Box>
          <Links
            routes={routes}
            key={routes}
            openSidebar={openSidebar}
            setOpenSidebar={setOpenSidebar}
          />
        </Box>
      </Stack>
    </Flex>
  );
}

export default SidebarContent;
