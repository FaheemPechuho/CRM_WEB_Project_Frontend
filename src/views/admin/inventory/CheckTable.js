import {
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from "react-table";

// Custom components
import Card from "components/card/Card";
import Pagination from "components/pagination/Pagination";
import Spinner from "components/spinner/Spinner";
import { FaSort, FaSortDown, FaSortUp } from "react-icons/fa";

import DataNotFound from "components/notFoundData";

export default function CheckTable(props) {
  const { tableData, dataColumn, isLoding } = props;
  const textColor = useColorModeValue("gray.500", "white");
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const columns = useMemo(() => dataColumn, [dataColumn]);

  const [gopageValue, setGopageValue] = useState();

  const data = useMemo(() => tableData, [tableData]);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance;

  if (pageOptions.length < gopageValue) {
    setGopageValue(pageOptions.length);
  }

  return (
    <>
      <Card
        direction="column"
        w="100%"
        overflowX={{ sm: "scroll", lg: "hidden" }}
      >
        <Box overflowY={"auto"} className="table-fix-container">
          <Table
            {...getTableProps()}
            variant="simple"
            color="gray.500"
            mb="24px"
          >
            <Thead zIndex={1}>
              {headerGroups?.map((headerGroup, index) => (
                <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  {headerGroup.headers?.map((column, index) => (
                    <Th
                      {...column.getHeaderProps(
                        column.isSortable !== false &&
                          column.getSortByToggleProps()
                      )}
                      pe="10px"
                      key={index}
                      borderColor={borderColor}
                    >
                      <Flex
                        align="center"
                        justifyContent={column.center ? "center" : "start"}
                        fontSize={{ sm: "14px", lg: "16px" }}
                        color="secondaryGray.900"
                      >
                        <span
                          style={{
                            textTransform: "capitalize",
                            marginRight: "8px",
                          }}
                        >
                          {column.render("Header")}
                        </span>
                        {column.isSortable !== false && (
                          <span>
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <FaSortDown />
                              ) : (
                                <FaSortUp />
                              )
                            ) : (
                              <FaSort />
                            )}
                          </span>
                        )}
                      </Flex>
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {isLoding ? (
                <Tr>
                  <Td colSpan={columns?.length}>
                    <Flex
                      justifyContent={"center"}
                      alignItems={"center"}
                      width="100%"
                      color={textColor}
                      fontSize="sm"
                      fontWeight="700"
                    >
                      <Spinner />
                    </Flex>
                  </Td>
                </Tr>
              ) : data?.length === 0 ? (
                <Tr>
                  <Td colSpan={columns.length}>
                    <Text
                      textAlign={"center"}
                      width="100%"
                      color={textColor}
                      fontSize="sm"
                      fontWeight="700"
                    >
                      <DataNotFound />
                    </Text>
                  </Td>
                </Tr>
              ) : (
                page?.map((row, i) => {
                  prepareRow(row);
                  return (
                    <Tr {...row?.getRowProps()} key={i} className="leadRow">
                      {row?.cells?.map((cell, index) => {
                        let data = "";
                        if (cell?.column.Header === "#") {
                          data = (
                            <Flex align="center">
                              <Text
                                color={textColor}
                                fontSize="sm"
                                fontWeight="700"
                              >
                                {cell?.row?.index + 1}
                              </Text>
                            </Flex>
                          );
                        } else {
                          data = <Text>{cell?.value}</Text>;
                        }
                        return (
                          <Td
                            {...cell?.getCellProps()}
                            key={index}
                            style={
                              cell?.column?.Header === "Manager"
                                ? { padding: "0 5px 0 0" }
                                : cell?.column?.Header === "Agent"
                                ? { padding: 0 }
                                : {}
                            }
                            fontSize={{ sm: "14px" }}
                            minW={{ sm: "150px", md: "200px", lg: "auto" }}
                            borderColor="transparent"
                          >
                            {data}
                          </Td>
                        );
                      })}
                    </Tr>
                  );
                })
              )}
            </Tbody>
          </Table>
        </Box>
        {data?.length > 5 && (
          <Pagination
            gotoPage={gotoPage}
            gopageValue={gopageValue}
            setGopageValue={setGopageValue}
            pageCount={pageCount}
            canPreviousPage={canPreviousPage}
            previousPage={previousPage}
            canNextPage={canNextPage}
            pageOptions={pageOptions}
            setPageSize={setPageSize}
            nextPage={nextPage}
            pageSize={pageSize}
            pageIndex={pageIndex}
          />
        )}
      </Card>
    </>
  );
}
