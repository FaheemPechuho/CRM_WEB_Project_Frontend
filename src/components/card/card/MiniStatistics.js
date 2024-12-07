// Chakra imports
// Chakra imports
import {
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Text,
  background,
  Skeleton,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import CountUpComponent from "components/countUpComponent/countUpComponent";
// Custom icons
import React from "react";

export default function Default(props) {
  const { startContent, endContent, name, growth, value, active, isLoaded = true, dashboardCard = false } = props;
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const numberColor = useColorModeValue("brand.500", "white");
  const textColorSecondary = "secondaryGray.600";

  return (
    <Card
      style={
        active
          ? {
              background: "#bc2423",
            }
          : {
            background: dashboardCard ? 'rgb(212 212 212 / 17%)' : ''
          }
      }
      cursor={"pointer"}
      py={!dashboardCard && "25px"}
      pb={!dashboardCard && "80px"}
      onClick={props.onClick}
    >
      <Flex
        my="auto"
        h="100%"
        align={{ base: "start" }}
        justify={{ base: "start", xl: "start" }}
      >
        {startContent}
        

        <Stat my="auto" width={"100%"} className="ml-4">
          <Skeleton width={"100%"} isLoaded={isLoaded}>
           <StatNumber
              width={"100%"}
              color={active ? "white" : (dashboardCard ? numberColor :  textColor)}
              fontSize={{
                base: "2xl",
              }}
            >
              <CountUpComponent targetNumber={value} />
              {/* {value} */}
            </StatNumber>
           
          <StatLabel
            lineHeight="100%"
            color={active ? "white" : textColorSecondary}
            fontSize={{
              base: props.fontsize ? props.fontsize : "md",
            }}
          >
            {name}
          </StatLabel>
          </Skeleton>

          {growth ? (
            <Flex align="center">
              <Text color="green.500" fontSize="xs" fontWeight="700" me="5px">
                {growth}
              </Text>
              <Text color="secondaryGray.600" fontSize="xs" fontWeight="400">
                since last month
              </Text>
            </Flex>
          ) : null}
        </Stat>
        <Flex ms="auto" w="max-content">
          {endContent}
        </Flex>
      </Flex>
    </Card>
  );
}
