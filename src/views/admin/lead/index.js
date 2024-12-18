import {
  Button,
  CircularProgress,
  Flex,
  Grid,
  GridItem,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getApi } from "services/api";
import { HasAccess } from "../../../redux/accessUtils";
import CheckTable from "./components/CheckTable";
import { postApi } from "services/api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Index = () => {
  const [isLoding, setIsLoding] = useState(false);
  const [data, setData] = useState([]);
  const [displaySearchData, setDisplaySearchData] = useState(false);
  const [searchedData, setSearchedData] = useState([]);
  const [totalLeads, setTotalLeads] = useState(0); 
  const [pages, setPages] = useState(0); 
  const user = JSON.parse(localStorage.getItem("user"));
  const [pagination, setPagination] = useState({
    offset: 0, 
    limit: 500
  })
  const tree = useSelector((state) => state.user.tree);

  const [permission, emailAccess, callAccess] = HasAccess([
    "Lead",
    "Email",
    "Call",
  ]);
  const tableColumns = [
    { Header: "#", accessor: "_id", isSortable: false, width: 10 },
    { Header: "Name", accessor: "leadName", width: 20 },
    { Header: "Manager", accessor: "managerAssigned" },
    { Header: "Agent", accessor: "agentAssigned" },
    { Header: "Status", accessor: "leadStatus" },
    { Header: "Email", accessor: "leadEmail" },
    { Header: "Phone Number", accessor: "leadPhoneNumber" },
    { Header: "Score", accessor: "leadScore" },
    { Header: "Action", isSortable: false, center: true },
  ];
  const tableColumnsManager = [
    { Header: "#", accessor: "_id", isSortable: false, width: 10 },
    { Header: "Name", accessor: "leadName", width: 20 },
    { Header: "Agent", accessor: "agentAssigned" },
    { Header: "Status", accessor: "leadStatus" },
    { Header: "Email", accessor: "leadEmail" },
    { Header: "Phone Number", accessor: "leadPhoneNumber" },
    { Header: "Score", accessor: "leadScore" },
    { Header: "Action", isSortable: false, center: true },
  ];
  const tableColumnsAgent = [
    { Header: "#", accessor: "_id", isSortable: false, width: 10 },
    { Header: "Name", accessor: "leadName", width: 20 },
    { Header: "Status", accessor: "leadStatus" },
    { Header: "Email", accessor: "leadEmail" },
    { Header: "Phone Number", accessor: "leadPhoneNumber" },
    { Header: "Score", accessor: "leadScore" },
    { Header: "Action", isSortable: false, center: true },
  ];

  const roleColumns = {
    Manager: tableColumnsManager,
    Agent: tableColumnsAgent,
  };

  const role = user?.roles[0]?.roleName;

  const [dynamicColumns, setDynamicColumns] = useState(
    roleColumns[role] || tableColumns
  );
  const [selectedColumns, setSelectedColumns] = useState(
    roleColumns[role] || tableColumns
  );
  const [action, setAction] = useState(false);
  const [dateTime, setDateTime] = useState({
    from: "",
    to: "",
  });
  const [autoAssignLoading, setAutoAssignLoading] = useState(false);
  const [columns, setColumns] = useState(roleColumns[role] || tableColumns);
  const { isOpen } = useDisclosure();

  const dataColumn = dynamicColumns?.filter((item) =>
    selectedColumns?.find((colum) => colum?.Header === item.Header)
  );

   const fetchData = async (pageNo = 1, pageSize = 10) => {
    setIsLoding(true);
    let result = await getApi(
      user.role === "superAdmin"
        ? "api/lead/" + "?dateTime=" + dateTime?.from + "|" + dateTime?.to + "&page=" + pageNo + "&pageSize=" + pageSize
        : `api/lead/?user=${user._id}&role=${
            user.roles[0]?.roleName
          }&dateTime=${dateTime?.from + "|" + dateTime?.to}&page=${pageNo}&pageSize=${pageSize}`
    );
    setData(result.data?.result || []);
    setPages(result.data?.totalPages || 0); 
    setTotalLeads(result.data?.totalLeads || 0); 
    setIsLoding(false);
  };

  const autoAssign = async () => {
    try {
      setAutoAssignLoading(true);
      let agents = [];

      if (tree && tree["managers"]) {
        agents = tree["agents"]["manager-" + user?._id?.toString()];
      }
      await postApi("api/user/autoAssign", { agents });
      setAutoAssignLoading(false);
      toast.success("Auto assignment of agents done!");
      fetchData();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    setColumns(tableColumns);
  }, [action]);



  return (
    <div>
      <Grid templateColumns="repeat(6, 1fr)" mb={3} gap={4}>
        <GridItem colSpan={6}>
        {role === "Manager" && 
            <Flex justifyContent={"flex-end"} mb={4}>
              <Button
                onClick={autoAssign}
                bg={"black"}
                disabled={autoAssignLoading}
                rounded={"full"}
                colorScheme={"white"}
              >
                {autoAssignLoading ? "Assigning.." : "Auto Assign"}
              </Button>
            </Flex>
        }
          <CheckTable
            dateTime={dateTime}
            setDateTime={setDateTime}
            isLoding={isLoding}
            setIsLoding={setIsLoding}
            columnsData={roleColumns[role] || tableColumns}
            isOpen={isOpen}
            setAction={setAction}
            dataColumn={dataColumn}
            action={action}
            setSearchedData={setSearchedData}
            totalLeads={totalLeads}
            pages={pages}
            allData={data}
            displaySearchData={displaySearchData}
            tableData={displaySearchData ? searchedData : data}
            fetchData={fetchData}
            setDisplaySearchData={setDisplaySearchData}
            setDynamicColumns={setDynamicColumns}
            dynamicColumns={dynamicColumns}
            selectedColumns={selectedColumns}
            access={permission}
            setSelectedColumns={setSelectedColumns}
            setData={setData}
            emailAccess={emailAccess}
            callAccess={callAccess}
          />
        </GridItem>
      </Grid>
    </div>
  );
};

export default Index;
