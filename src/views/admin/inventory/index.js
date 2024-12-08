import {
  Alert,
  Button,
  Divider,
  Flex,
  FormLabel,
  Input,
  Progress,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
import { BiError } from "react-icons/bi";
import { useDisclosure } from "@chakra-ui/react";
import html2canvas from "html2canvas";
import Avenue5Logo from "../../../assets/img/avenue5-logo.png";

const tableColumns = [
  { Header: "#", isSortable: false, width: 10 },
  { Header: "No.", isSortable: true },
  { Header: "Project", isSortable: true },
  { Header: "Floor", isSortable: true },
  { Header: "Unit Price", isSortable: true },
  { Header: "Type", isSortable: true },
  { Header: "Price/sq.ft", isSortable: true },
  { Header: "Size/sq.ft", isSortable: true },
  { Header: "Status", isSortable: true },
  { Header: "Down Payment 25%", isSortable: true },
];

function Explore() {
  const [isLoading, setIsLoading] = useState(true);
  const [sheetData, setSheetData] = useState({
    columns: [],
    values: [],
  });
  const [filteredData, setFilteredData] = useState([]);
  const [BudgetAmount, setBudgetAmount] = useState("");
  const [UnitType, setUnitType] = useState("");
  const [noDataFound, setNoDataFound] = useState(false);
  const [activeRow, setActiveRow] = useState({
    id: null,
  });

  const isOpen = useDisclosure();

  const handleDownloadImage = async () => {
    const element = document.getElementById("proposal-container"),
      canvas = await html2canvas(element),
      data = canvas.toDataURL("image/jpg"),
      link = document.createElement("a");

    link.href = data;
    link.download = "downloaded.jpg";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const fetchSheet = async () => {
    const GOOGLE_SHEETS_API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;
    const GOOGLE_SHEETS_ID = process.env.REACT_APP_GOOGLE_SHEET_ID;

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_ID}?key=${GOOGLE_SHEETS_API_KEY}`
      );
      const sheets = await response.json();

      const range = `${sheets?.sheets[0]?.properties?.title}`;

      const sheet = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEETS_ID}/values/${range}?key=${GOOGLE_SHEETS_API_KEY}`
      );
      const sheetData = await sheet.json();

      const columns = sheetData?.values[0];
      const values = sheetData?.values?.slice(1);

      setSheetData({
        columns: columns?.map((col) => col?.trim()),
        values,
      });

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSheet();
  }, []);

  const handleFind = (e) => {
    e.preventDefault();
    let allValues = sheetData?.values;
    let allColumns = sheetData?.columns;

    if (BudgetAmount?.trim() || UnitType?.trim()) {
      if (BudgetAmount?.trim()) {
        const budgetIdx = allColumns.indexOf("Unit Price");
        allValues = allValues?.filter(
          (val) =>
            parseFloat(val[budgetIdx]?.replaceAll(",", "")) <
            parseFloat(BudgetAmount)
        );
      }

      if (UnitType?.trim()) {
        const unitIdx = allColumns.indexOf("Type");

        allValues = allValues?.filter((val) =>
          val[unitIdx]?.toLowerCase()?.includes(UnitType?.toLowerCase())
        );
      }

      if (!allValues?.length) {
        setNoDataFound(true);
      } else {
        setNoDataFound(false);
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
        setFilteredData(allValues);
      }
    } else {
      setFilteredData([]);
    }
  };

  useEffect(() => {
    setActiveRow({
      id: null,
    });
  }, [filteredData]);

  function ProposalComp({ activeRow }) {
    const details = activeRow?.data;

    const unitPrice = details?.hasOwnProperty("Unit Price") ? parseFloat(details["Unit Price"]?.replaceAll(",", "")) : 0;

    return (
      <div
        style={{
          position: "fixed",
          left: "-200%",
          top: "-200%",
          backgroundImage: "url(/img/proposal-bg.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          backgroundBlendMode: "overlay",
        }}
        id="proposal-container"
      >
        <VStack
          w="full"
          p={4}
          spacing={5}
          align="stretch"
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="md"
        >
          <Text fontSize="2xl" fontWeight="bold">
            {details?.Project}
          </Text>

          <Divider borderColor={"#ddd"} />

          <Table variant="simple">
            <Tbody>
              <Tr>
                <Td fontWeight={"bold"}>Project</Td>
                <Td fontWeight={"bold"} isNumeric>{details?.Project}</Td>
              </Tr>
              <Tr>
                <Td fontWeight={"bold"}>Unit Details</Td>
                <Td fontWeight={"bold"} isNumeric>{details?.No}</Td>
              </Tr>
              <Tr>
                <Td fontWeight={"bold"}>Size Sqft</Td>
                <Td fontWeight={"bold"} isNumeric>
                  {details?.hasOwnProperty("Size/sq.ft") &&
                    details["Size/sq.ft"]}
                </Td>
              </Tr>
              <Tr>
                <Td fontWeight={"bold"}>Per Sq ft Rate</Td>
                <Td fontWeight={"bold"} isNumeric>
                  {details?.hasOwnProperty("Price/sq.ft") &&
                    details["Price/sq.ft"]}
                </Td>
              </Tr>
              <Tr>
                <Td fontWeight={"bold"}>Total Price</Td>
                <Td fontWeight={"bold"} isNumeric>
                  {details?.hasOwnProperty("Unit Price") &&
                    details["Unit Price"]}
                </Td>
              </Tr>
              <Tr>
                <Td fontWeight={"bold"}>Down Payment 25%</Td>
                <Td fontWeight={"bold"} isNumeric>
                  {details?.hasOwnProperty("Unit Price")
                    ? (unitPrice - (0.25 * unitPrice))
                    : 0}
                </Td>
              </Tr>
              <Tr>
                <Td fontWeight={"bold"}>Quarterly Installment (12)</Td>
                <Td fontWeight={"bold"} isNumeric>
                  {details?.hasOwnProperty("Unit Price")
                    ? ((unitPrice - (0.25 * unitPrice)) / 12)
                    : 0}
                </Td>
              </Tr>
              <Tr>
                <Td fontWeight={"bold"}>Monthly Installment (36)</Td>
                <Td fontWeight={"bold"} isNumeric>
                  {details?.hasOwnProperty("Unit Price")
                    ? ((unitPrice - (0.25 * unitPrice)) / 36)
                    : 0}
                </Td>
              </Tr>
            </Tbody>
          </Table>

          <Flex
            pt={3}
            borderTop={"1px solid #ddd"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text color={"grey"} mb={3}>https://avenue5international.com</Text>
            <img alt="" width={100} src={Avenue5Logo} />
          </Flex>
        </VStack>
      </div>
    );
  }

  return (
    <>
      <Flex
        justifyContent={"space-between"}
        pt={8}
        alignItems={"flex-end"}
        mb={4}
      >
        <form style={{ width: "100%" }} action="#" onSubmit={handleFind}>
          <Flex
            width={"100%"}
            justifyContent={"space-between"}
            alignItems={"flex-end"}
          >
            <Flex alignItems={"flex-end"}>
              <div style={{ marginRight: 12 }}>
                <FormLabel htmlFor="budget-amount">
                  Enter Budget Amount
                </FormLabel>
                <Input
                  type="number"
                  value={BudgetAmount}
                  onChange={(e) => setBudgetAmount(e.target.value)}
                  id="budget-amount"
                  placeholder="0"
                />
              </div>
              <div>
                <FormLabel
                  htmlFor="unit-type"
                  className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter Unit Type
                </FormLabel>
                <Select value={UnitType} onChange={(e) => setUnitType(e.target.value)}>
                <option selected value={""}>Type</option>
                  <option value={"Commercial Shop"}>
                      Commerical Shop
                  </option>
                  <option value={"Apartment"}>
                      Apartment
                  </option>
                </Select>
              </div>
              <Button variant="brand" type="submit" disabled={isLoading} ms={3}>
                Find!
              </Button>
            </Flex>

            <ProposalComp activeRow={activeRow} />

            {activeRow?.id !== null && (
              <Button
                onClick={handleDownloadImage}
                id="generate-proposal-btn"
                size="lg"
                color={"white"}
                backgroundImage={"linear-gradient(to right, #34ca00, #00ee47)"}
              >
                Generate Proposal
              </Button>
            )}
          </Flex>
        </form>
      </Flex>

      {isLoading ? (
        <div className="flex justify-center">
          <Progress />
        </div>
      ) : (
        [
          filteredData?.length ? (
            <div className={`w-full inline-block align-middle`}>
              <Flex
                height={440}
                border={"1px solid black"}
                overflow={"scroll"}
                mt={8}
              >
                {/* <CheckTable
                  isLoding={isLoading}
                  setIsLoding={setIsLoading}
                  columnsData={tableColumns}
                  isOpen={isOpen}
                  allData={filteredData}
                  tableData={filteredData}
                /> */}
                <Table variant="simple">
                  <Thead
                    position="sticky"
                    top={0}
                    zIndex="docked"
                    background={"black"}
                  >
                    <Tr>
                      <Th scope="col" fontWeight={"bold"} color={"white"}>
                        ID
                      </Th>
                      {sheetData?.columns?.map((col) => {
                        return (
                          <Th
                            key={col}
                            scope="col"
                            color={"white"}
                            fontWeight={"bold"}
                          >
                            {col}
                          </Th>
                        );
                      })}
                    </Tr>
                  </Thead>
                  <Tbody className="divide-y divide-gray-200">
                    {filteredData?.map((row, rowIndex) => {
                      return (
                        <Tr
                          cursor={"pointer"}
                          background={activeRow?.id === rowIndex && "lightblue"}
                          onClick={() => {
                            const data = {};
                            sheetData?.columns?.forEach((col, idx) => {
                              data[col] = filteredData[rowIndex][idx];
                            });

                            setActiveRow(
                              activeRow?.id === rowIndex
                                ? { id: null }
                                : {
                                    id: rowIndex,
                                    data,
                                  }
                            );
                          }}
                          key={rowIndex}
                        >
                          <Td color={"blue"}>{rowIndex + 1}</Td>
                          {sheetData?.columns?.map((col, index) => {
                            return (
                              <Td
                                fontWeight={
                                  (col?.toLowerCase() === "unit price" ||
                                    col?.toLowerCase() === "type") &&
                                  "bold"
                                }
                                key={index}
                                className="px-6 py-4 text-sm font-medium text-gray-800 dark:text-white whitespace-nowrap"
                              >
                                {filteredData[rowIndex][index] || "-"}
                              </Td>
                            );
                          })}
                        </Tr>
                      );
                    })}
                  </Tbody>
                </Table>
              </Flex>
            </div>
          ) : (
            <>
              {noDataFound ? (
                <Alert color="failure" icon={BiError}>
                  <span>
                    <p>No data found!</p>
                  </span>
                </Alert>
              ) : (
                <Alert color="info" icon={AiFillInfoCircle}>
                  <span>
                    <p>Enter data and hit 'Find' button!</p>
                  </span>
                </Alert>
              )}
            </>
          ),
        ]
      )}
    </>
  );
}

export default Explore;
