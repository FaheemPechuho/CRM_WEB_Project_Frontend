import React, { useEffect, useState } from "react";

// chakra imports
import {
  Box,
  Flex,
  Drawer,
  DrawerBody,
  Icon,
  useColorModeValue,
  DrawerOverlay,
  useDisclosure,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { socket } from "../../index";
import Content from "components/sidebar/components/Content";
import Links from "./components/Links";
import {
  renderThumb,
  renderTrack,
  renderView,
} from "components/scrollbar/Scrollbar";
import { Scrollbars } from "react-custom-scrollbars-2";
import PropTypes from "prop-types";

// Assets
import { IoMenuOutline } from "react-icons/io5";
import ReminderToast from "./components/ReminderToast";
import { toast } from "react-toastify";

function Sidebar(props) {
  const { routes, setOpenSidebar, openSidebar, largeLogo } = props;

  const user = JSON.parse(localStorage.getItem("user"));

  let variantChange = "0.2s linear";
  let shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  // Chakra Color Mode
  let sidebarBg = useColorModeValue("white", "navy.800");
  let sidebarMargins = "0px";
  const { isOpen, onOpen, onClose } = useDisclosure();
  // SIDEBAR

  useEffect(() => {
    if (socket && user && user?._id) {
      socket.emit("add_user", {
        userID: user?._id,
        userName: user?.firstName + " " + user?.lastName,
      });

      socket.on("followup_reminder", (task) => {
        toast(<ReminderToast />, {
          position: "bottom-right",
          autoClose: 20000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: true,
          closeButton: false,
          draggable: false,
          theme: "light",
        });
      });
    }
  }, [socket]);
  return (
    <Box
      display={{ sm: "none", xl: "block" }}
      w="100%"
      position="fixed"
      minH="100%"
    >
      <Box
        bg={sidebarBg}
        transition={variantChange}
        // w='280px'
        w={openSidebar ? "280px" : "80px"}
        h="100vh"
        m={sidebarMargins}
        minH="100%"
        overflowX="hidden"
        // boxShadow={shadow}
        className="border border-r"
      >
        <Scrollbars
          autoHide
          renderTrackVertical={renderTrack}
          renderThumbVertical={renderThumb}
          renderView={renderView}
        >
          <Content
            routes={routes}
            largeLogo={largeLogo}
            openSidebar={openSidebar}
            setOpenSidebar={setOpenSidebar}
          />
        </Scrollbars>
      </Box>
    </Box>
  );
}

// FUNCTIONS
export function SidebarResponsive(props) {
  let sidebarBackgroundColor = useColorModeValue("white", "navy.800");
  let menuColor = useColorModeValue("gray.400", "white");
  // // SIDEBAR
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { routes, setOpenSidebar, openSidebar } = props;
  // let isWindows = navigator.platform.startsWith("Win");
  //  BRAND
  const handlesidebarClose = () => {
    // setOpenSidebar(false)
    onClose();
  };

  return (
    <Flex  display={{ sm: "flex", xl: "none" }} alignItems="center">
      <Flex
        ref={btnRef}
        w="max-content"
        h="max-content"
        onClick={() => {
          onOpen();
          setOpenSidebar(true);
        }}
      >
        <Icon
          as={IoMenuOutline}
          color={menuColor}
          my="auto"
          w="20px"
          h="20px"
          me="10px"
          _hover={{ cursor: "pointer" }}
        />
      </Flex>

      <Drawer
        isOpen={isOpen}
        onClose={handlesidebarClose}
        placement={document.documentElement.dir === "rtl" ? "right" : "left"}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          // boxShadow={"xl"}
          w="285px"
          maxW="285px"
          bg={sidebarBackgroundColor}
        >
          <DrawerCloseButton
            zIndex="3"
            onClose={handlesidebarClose}
            _focus={{ boxShadow: "none" }}
            _hover={{ boxShadow: "none" }}
          />
          <DrawerBody maxW="285px" px="0rem" pb="0">
            <Scrollbars
              autoHide
              renderTrackVertical={renderTrack}
              renderThumbVertical={renderThumb}
              renderView={renderView}
            >
              <Content
                routes={routes}
                openSidebar={openSidebar}
                setOpenSidebar={setOpenSidebar}
              />
            </Scrollbars>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
// PROPS

Sidebar.propTypes = {
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  variant: PropTypes.string,
};

export default Sidebar;
