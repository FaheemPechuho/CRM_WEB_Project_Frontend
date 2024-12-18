import { Box, CircularProgress, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { putApi } from "services/api";

const RenderManager = ({ value, leadID, fetchData, pageIndex, setData }) => {
  const [ManagerSelected, setManagerSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const tree = useSelector((state) => state.user.tree);

  const handleChangeManager = async (e) => {
    try {
      setLoading(true);
      const dataObj = {
        managerAssigned: e.target.value,
      };

      if (e.target.value === "") {
        dataObj["agentAssigned"] = "";
      }
      await putApi(`api/lead/edit/${leadID}`, dataObj);
      toast.success("Manager updated successfuly");
      setData((prevData) => {
        const newData = [...prevData];

        const updateIdx = newData.findIndex((l) => l._id.toString() === leadID);
        if (updateIdx !== -1) {
          newData[updateIdx].managerAssigned = dataObj.managerAssigned;
          newData[updateIdx].agentAssigned = "";
        }
        return newData;
      });
      // fetchData();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update the manager");
    }
    setLoading(false);
  };

  useEffect(() => {
    setManagerSelected(value);
  }, [value]);

  return loading ? (
    <Box
      border={"1px solid #eee"}
      borderRadius={"4px"}
      padding={"3"}
      display={"flex"}
      alignItems={"center"}
    >
      <p style={{ marginRight: 8 }}>Updating</p>{" "}
      <CircularProgress size={4} isIndeterminate />
    </Box>
  ) : (
    <Select
      style={{
        color: !ManagerSelected ? "grey" : "black",
      }}
      value={ManagerSelected}
      onChange={handleChangeManager}
      placeholder="No Manager"
    >
      {tree?.managers?.map((manager) => (
        <option key={manager?._id?.toString()} value={manager?._id?.toString()}>
          {manager?.firstName + " " + manager?.lastName}
        </option>
      ))}
    </Select>
  );
};

export default RenderManager;
