import { CloseIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Button,
  FormLabel,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
} from "@chakra-ui/react";
import Spinner from "components/spinner/Spinner";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { userSchema } from "schema";
import { useSelector } from "react-redux";
import { getApi } from "services/api";
import { postApi } from "services/api";

const AddUser = (props) => {
  const { onClose, isOpen, setAction } = props;
  const [isLoding, setIsLoding] = useState(false);
  const [roles, setRoles] = useState([]);

  const tree = useSelector((state) => state.user); 

  const [show, setShow] = React.useState(false);
  const showPass = () => setShow(!show);

  const initialValues = {
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    password: "",
    role: "", 
    parent: "",
    };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: userSchema,
    onSubmit: (values, { resetForm }) => {
      AddData();
      resetForm();
    },
  });
  const {
    errors,
    touched,
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
  } = formik;

    const user = JSON.parse(localStorage.getItem("user")); 


  const AddData = async () => {
    try {
      setIsLoding(true);
      const formValues = {...values}; 

      if(user?.roles[0]?.roleName === "Manager"){
        formValues["parent"] = user?._id?.toString(); 
        formValues["role"] = roles?.find((role) => role?.roleName === "Agent")?._id?.toString(); 
      } else {
        if(roles.find((role) => role?._id === values.role)?.roleName === "Agent") {
          formValues["parent"] = values.parent; 
        }
      }

      if(!formValues["parent"]) {
        delete formValues["parent"];
      }

      if(values["role"]) {
        formValues["roles"] = [values.role?.toString()]; 
      }

      let response = await postApi("api/user/register", formValues);
      if (response && response.status === 200) {
        props.onClose();
        setAction((pre) => !pre);
      } else {
        toast.error(response.response.data?.message);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoding(false);
    }
  };


  const fetchRoles = async () => {
    let result = await getApi("api/role-access");
    setRoles(result.data);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  console.log(tree); 

  return (
    <Modal size="2xl" isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader justifyContent="space-between" display="flex">
          Add User
          <IconButton onClick={onClose} icon={<CloseIcon />} />
        </ModalHeader>
        <ModalBody>
          <Grid templateColumns="repeat(12, 1fr)" gap={3}>
            <GridItem colSpan={{ base: 12 }}>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                mb="8px"
              >
                First Name
              </FormLabel>
              <Input
                fontSize="sm"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                name="firstName"
                placeholder="firstName"
                fontWeight="500"
                borderColor={
                  errors.firstName && touched.firstName ? "red.300" : null
                }
              />
              <Text mb="10px" color={"red"}>
                {" "}
                {errors.firstName && touched.firstName && errors.firstName}
              </Text>
            </GridItem>
            <GridItem colSpan={{ base: 12 }}>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                mb="8px"
              >
                Last Name
              </FormLabel>
              <Input
                fontSize="sm"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
                name="lastName"
                placeholder="Last Name"
                fontWeight="500"
                borderColor={
                  errors.lastName && touched.lastName ? "red.300" : null
                }
              />
              <Text mb="10px" color={"red"}>
                {" "}
                {errors.lastName && touched.lastName && errors.lastName}
              </Text>
            </GridItem>
            <GridItem colSpan={{ base: 6 }}>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                mb="8px"
              >
                Email
              </FormLabel>
              <Input
                fontSize="sm"
                type="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                name="username"
                placeholder="Email Address"
                fontWeight="500"
                borderColor={
                  errors.username && touched.username ? "red.300" : null
                }
              />
              <Text mb="10px" color={"red"}>
                {" "}
                {errors.username && touched.username && errors.username}
              </Text>
            </GridItem>
            <GridItem colSpan={{ base: 6 }}>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                mb="8px"
              >
                Phone Number<Text color={"red"}>*</Text>
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<PhoneIcon color="gray.300" borderRadius="16px" />}
                />
                <Input
                  type="tel"
                  fontSize="sm"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phoneNumber}
                  name="phoneNumber"
                  fontWeight="500"
                  borderColor={
                    errors.phoneNumber && touched.phoneNumber ? "red.300" : null
                  }
                  placeholder="Phone number"
                  borderRadius="16px"
                />
              </InputGroup>
              <Text mb="10px" color={"red"}>
                {errors.phoneNumber &&
                  touched.phoneNumber &&
                  errors.phoneNumber}
              </Text>
            </GridItem>
            {user?.roles[0]?.roleName !== "Manager" &&
            <GridItem colSpan={{ base: 6 }}>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                mb="8px"
              >
                Select Role <Text color={"red"}>*</Text>
              </FormLabel>
              <Select name="role" value={values.role} onChange={handleChange} onBlur={handleBlur} placeholder="Select Role">

                {roles?.map((role) => <option value={role?._id}>{role?.roleName}</option>)}
              </Select>
    
            </GridItem>
            }
            {(roles.find((role) => role?._id === values.role)?.roleName === "Agent" && user?.roles[0]?.roleName !=="Manager") && 
                <GridItem colSpan={{ base: 6 }}>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                mb="8px"
              >
                Select Manager <Text color={"red"}>*</Text>
              </FormLabel>
              <Select name="parent" value={values.parent} onChange={handleChange} onBlur={handleBlur} placeholder="Select Manager">

                {tree?.tree?.managers?.map((manager) => <option value={manager?._id}>{manager?.firstName + " " + manager?.lastName}</option>)}
              </Select>
            </GridItem>
            }
            <GridItem colSpan={{ base: 12 }}>
              <FormLabel
                display="flex"
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                mb="8px"
              >
                Password
              </FormLabel>
              <InputGroup size="md">
                <Input
                  isRequired={true}
                  fontSize="sm"
                  placeholder="Enter Your Password"
                  name="password"
                  size="lg"
                  variant="auth"
                  type={show ? "text" : "password"}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  borderColor={
                    errors.password && touched.password ? "red.300" : null
                  }
                  className={
                    errors.password && touched.password ? "isInvalid" : null
                  }
                />
                <InputRightElement display="flex" alignItems="center" mt="4px">
                  <Icon
                    color={"gray.400"}
                    _hover={{ cursor: "pointer" }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={showPass}
                  />
                </InputRightElement>
              </InputGroup>
              <Text mb="10px" color={"red"}>
                {" "}
                {errors.password && touched.password && errors.password}
              </Text>
            </GridItem>
          </Grid>
        </ModalBody>
        <ModalFooter>
          <Button
            variant="brand"
            size="sm"
            disabled={isLoding ? true : false}
            onClick={handleSubmit}
          >
            {isLoding ? <Spinner /> : "Save"}
          </Button>
          <Button
            sx={{
              marginLeft: 2,
              textTransform: "capitalize",
            }}
            variant="outline"
            colorScheme="red"
            size="sm"
            onClick={() => {
              formik.resetForm();
              onClose();
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddUser;
