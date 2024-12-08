import { Button, Grid, GridItem, useDisclosure } from "@chakra-ui/react";
import CheckTable from "./components/CheckTable";
import { AddIcon } from "@chakra-ui/icons";
import Add from "./add";
import { useEffect, useState } from "react";
import { getApi } from "services/api";
import { HasAccess } from "../../../redux/accessUtils";
import { useSelector } from "react-redux";

const Index = () => {
  const tableColumns = [
    {
      Header: "#",
      accessor: "_id",
      isSortable: false,
      width: 10,
    },
    { Header: "sender", accessor: "senderName" },
    { Header: "recipient", accessor: "createByName" },
    { Header: "Realeted To" },
    { Header: "Comments", accessor: "callNotes" },
    { Header: "timestamp", accessor: "timestamp" },
    { Header: "Created" },
    { Header: "Action", isSortable: false, center: true },
  ];
  const [action, setAction] = useState(false);
  const [columns, setColumns] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [data, setData] = useState([]);
  const [displaySearchData, setDisplaySearchData] = useState(false);
  const [searchedData, setSearchedData] = useState([]);
  const [dynamicColumns, setDynamicColumns] = useState([...tableColumns]);
  const [selectedColumns, setSelectedColumns] = useState([...tableColumns]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const size = "lg";
  const user = JSON.parse(localStorage.getItem("user"));
  const tree = useSelector((state) => state.user.tree);
  const [dateTime, setDateTime] = useState({
    from: "",
    to: "",
  });

  const fetchData = async () => {
    setIsLoding(true);

    let agentIDs = [];

    if (tree && user?.roles[0]?.roleName === "Manager") {
      agentIDs = tree["agents"]["manager-" + user._id.toString()].map((agent) =>
        agent._id.toString()
      );
    }

    let result = await getApi(
      user.role === "superAdmin"
        ? "api/phoneCall?role=superAdmin" +
            "&dateTime=" +
            dateTime?.from +
            "|" +
            dateTime?.to
        : `api/phoneCall?sender=${user._id}&role=${
            user.roles[0].roleName
          }&agents=${agentIDs}&dateTime=${dateTime?.from + "|" + dateTime?.to}`
    );
    setData(result?.data || []);
    setIsLoding(false);
  };

  const dataColumn = dynamicColumns?.filter((item) =>
    selectedColumns?.find((colum) => colum?.Header === item.Header)
  );

  useEffect(() => {
    setColumns(tableColumns);
  }, [action]);

  const [permission] = HasAccess(["Call"]);

  return (
    <div>
      <CheckTable
        // action={action} columnsData={columns}
        isLoding={isLoding}
        columnsData={columns}
        dataColumn={dataColumn}
        dateTime={dateTime}
        setDateTime={setDateTime}
        isOpen={isOpen}
        setAction={setAction}
        action={action}
        setSearchedData={setSearchedData}
        allData={data}
        displaySearchData={displaySearchData}
        tableData={displaySearchData ? searchedData : data}
        fetchData={fetchData}
        setDisplaySearchData={setDisplaySearchData}
        setDynamicColumns={setDynamicColumns}
        dynamicColumns={dynamicColumns}
        selectedColumns={selectedColumns}
        setSelectedColumns={setSelectedColumns}
        access={permission}
      />
      {/* Add Form */}
    </div>
  );
};

export default Index;
