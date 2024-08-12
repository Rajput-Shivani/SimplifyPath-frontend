import React, { useEffect } from "react";
import { Modal, Button, Switch, Checkbox, Divider, Collapse, List } from "antd";
import { ArrowLeftOutlined, CaretDownOutlined, CloseOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { addNewRoleData } from "../../redux/slices/userRoleSlice";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.scss";
import dropDown from "../../assets/dropdown.svg";
import { getAllPermissions } from "../../redux/slices/userManagementSlice";
import { setIsActivatePopup } from "../../redux/slices/popUpSlice";
const { Panel } = Collapse;

const ActiveDeactive = ({
  isActive,
  pageName,
  onClose,
  addNewRole,
  setAddNewRole,
  userData,
  setUserData,
  setOpen,
  handleSubmit,
  isEdit
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isChecked, setChecked] = React.useState({});
  const [isDropdownOpen, setIsDropdownOpen] = React.useState({});
  const [isAnyMethodSelected, setIsAnyMethodSelected] = React.useState(false);
  const role = useSelector((state) => state.userManagementReducer.getRolesData);
  const {addUserRoles} = useSelector((state)=>state.userRoleReducer)
  const { isActivatePopup,isEditActivate } = useSelector((state) => state.popUpRedducer);
  const getPermission = useSelector(
    (state) => state.userManagementReducer.getAllPermission
  );
  const { page, limit, searchItem, sortConfig } = useSelector(
    (state) => state.globalReducer
  );

  const handleDropdownClick = (label) => {
    setIsDropdownOpen((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  // const handleSwitchChange = (label) => {
  //   setChecked((prev) => ({
  //     ...prev,
  //     [label]: !prev[label],
  //   }));

  //   // Ensure the dropdown opens when the switch is turned on
  //   setIsDropdownOpen((prev) => ({
  //     ...prev,
  //     [label]: !isChecked[label],
  //   }));
  // };

  //workingCorrect
  // const handleSwitchChange = (label) => {
  //   setChecked((prev) => {
  //     const isCurrentlyChecked = !!prev[label];
  //     const updatedChecked = isCurrentlyChecked ? {} : prev[label];
  
  //     // Reset methods when switch is turned off
  //     if (isCurrentlyChecked) {
  //       // Removing methods from addNewRole and userData
  //       setAddNewRole((prevRole) => {
  //         const updatedPermissions = { ...prevRole.permissions };
  //         delete updatedPermissions[label];
  //         return {
  //           ...prevRole,
  //           name: addNewRole?.name,
  //           permissions: updatedPermissions,
  //         };
  //       });
  //       setUserData((prevData) => {
  //         const updatedPermissions = { ...prevData.permissions };
  //         delete updatedPermissions[label];
  //         return {
  //           ...prevData,
  //           permissions: updatedPermissions,
  //         };
  //       });
  //     }
  
  //     return {
  //       ...prev,
  //       [label]: updatedChecked,
  //     };
  //   });
  
  //   setIsDropdownOpen((prev) => ({
  //     ...prev,
  //     [label]: !isChecked[label],
  //   }));
  // };

  const handleSwitchChange = (label) => {
    setChecked((prev) => {
      const currentState = !!prev[label];
      const newState = !currentState;
  
      // Update the checked state
      const updatedChecked = newState ? { ...prev[label] } : {};
  
      // Update permissions when switch is toggled
      setAddNewRole((prevRole) => {
        const updatedPermissions = { ...prevRole.permissions };
        if (newState) {
          // When turning on, keep existing permissions or add new ones
          updatedPermissions[label] = updatedPermissions[label] || Object.keys(updatedChecked);
        } else {
          // When turning off, remove the permissions
          delete updatedPermissions[label];
        }
        return {
          ...prevRole,
          name: addNewRole?.name,
          permissions: updatedPermissions,
        };
      });
  
      setUserData((prevData) => {
        const updatedPermissions = { ...prevData.permissions };
        if (newState) {
          // When turning on, keep existing permissions or add new ones
          updatedPermissions[label] = updatedPermissions[label] || Object.keys(updatedChecked);
        } else {
          // When turning off, remove the permissions
          delete updatedPermissions[label];
        }
        return {
          ...prevData,
          permissions: updatedPermissions,
        };
      });
  
      return {
        ...prev,
        [label]: updatedChecked,
      };
    });
  
    // Ensure the dropdown opens or closes based on the switch state
    setIsDropdownOpen((prev) => ({
      ...prev,
      [label]: !isChecked[label],
    }));
  };
  
  

  const handleClose = () => {
    onClose();
  };

  const handleChange = (label, method) => (event) => {
    const { checked } = event.target;

    setChecked((prev) => ({
      ...prev,
      [label]: {
        ...prev[label],
        [method]: checked,
      },
    }));

    setAddNewRole((prev) => {
      const updatedPermissions = { ...prev.permissions };

      if (checked) {
        updatedPermissions[label] = updatedPermissions[label]
          ? [...updatedPermissions[label], method]
          : [method];
      } else {
        updatedPermissions[label] = updatedPermissions[label]?.filter(
          (item) => item !== method
        );
      }

      return {
        ...prev,
        name:addNewRole?.name,
        permissions: updatedPermissions,
      };
    });
    setUserData((prev) => {
      const updatedPermissions = { ...prev.permissions };

      if (checked) {
        updatedPermissions[label] = updatedPermissions[label]
          ? [...updatedPermissions[label], method]
          : [method];
      } else {
        updatedPermissions[label] = updatedPermissions[label]?.filter(
          (item) => item !== method
        );
      }

      return {
        ...prev,
        permissions: updatedPermissions,
      };
    });
  };

  useEffect(() => {
    if (addNewRole) {
      const initialCheckedState = {};
      for (const [label, methods] of Object.entries(addNewRole?.permissions)) {
        initialCheckedState[label] = {};
        methods.forEach((method) => {
          initialCheckedState[label][method] = true;
        });
      }
      setChecked(initialCheckedState);
    }
  }, [addNewRole]);
  


  // const SwitchSection = ({ label, methods }) => {
  //   const isAnyMethodSelected = Object.values(isChecked[label] || {}).some(Boolean);

  //   return (
  //     <div style={{ marginTop: "16px" }}>
  //       <List bordered size="large">
  //         <div
  //           className={
  //             isAnyMethodSelected ? styles.active_section : styles.inactive_section
  //           }
  //           style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: '15px' }}
  //         >
  //           <div className={styles.text} style={{ display: "flex", alignItems: "center" }}>
  //             <img
  //               src={dropDown}
  //               alt="dropdown"
  //               onClick={() => handleDropdownClick(label)}
  //               style={{ cursor: "pointer", marginRight: "8px" }}
  //             />
  //             <div>{label}</div>
  //           </div>
  //           <Switch
  //             checked={isAnyMethodSelected}
  //             onChange={() => handleSwitchChange(label)}
  //           />
  //         </div>
  //         {isDropdownOpen[label] && (
  //           <List.Item>
  //             {methods?.map((method, index) => (
  //               <List.Item key={index} style={{ display: "flex" }}>
  //                 <Checkbox
  //                   checked={isChecked[label] && isChecked[label][method]}
  //                   onChange={handleChange(label, method)}
  //                   value={method}
  //                 />
  //                 <span style={{ marginLeft: "5px" }}>{method}</span>
  //               </List.Item>
  //             ))}
  //           </List.Item>
  //         )}
  //       </List>
  //     </div>
  //   );
  // };
//working correct
  // const SwitchSection = ({ label, methods }) => {
  //   const isAnyMethodSelected = Object.values(isChecked[label] || {}).some(Boolean);
  
  //   return (
  //     <div style={{ marginTop: "16px" }}>
  //       <List bordered size="large">
  //         <div
  //           className={
  //             isAnyMethodSelected ? styles.active_section : styles.inactive_section
  //           }
  //           style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: '15px' }}
  //         >
  //           <div className={styles.text} style={{ display: "flex", alignItems: "center" }}>
  //             <img
  //               src={dropDown}
  //               alt="dropdown"
  //               onClick={() => handleDropdownClick(label)}
  //               style={{ cursor: "pointer", marginRight: "8px" }}
  //             />
  //             <div>{label}</div>
  //           </div>
  //           <Switch
  //             checked={isAnyMethodSelected}
  //             onChange={() => handleSwitchChange(label)}
  //           />
  //         </div>
  //         {isDropdownOpen[label] && (
  //           <List.Item>
  //             {methods?.map((method, index) => (
  //               <List.Item key={index} style={{ display: "flex" }}>
  //                 <Checkbox
  //                   checked={isChecked[label] && isChecked[label][method]}
  //                   onChange={handleChange(label, method)}
  //                   value={method}
  //                 />
  //                 <span style={{ marginLeft: "5px" }}>{method}</span>
  //               </List.Item>
  //             ))}
  //           </List.Item>
  //         )}
  //       </List>
  //     </div>
  //   );
  // };

  const SwitchSection = ({ label, methods }) => {
    const isAnyMethodSelected = Object.values(isChecked[label] || {}).some(Boolean);
  
    return (
      <div style={{ marginTop: "16px" }}>
        <List bordered size="large">
          <div
            className={
              isAnyMethodSelected ? styles.active_section : styles.inactive_section
            }
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: '15px' }}
          >
            <div className={styles.text} style={{ display: "flex", alignItems: "center" }}>
              <img
                src={dropDown}
                alt="dropdown"
                onClick={() => handleDropdownClick(label)}
                style={{ cursor: "pointer", marginRight: "8px" }}
              />
              <div>{label}</div>
            </div>
            <Switch
              checked={!!isChecked[label]}
              onChange={() => handleSwitchChange(label)}
            />
          </div>
          {isDropdownOpen[label] && (
            <List.Item>
              {methods?.map((method, index) => (
                <List.Item key={index} style={{ display: "flex" }}>
                  <Checkbox
                    checked={isChecked[label] && isChecked[label][method]}
                    onChange={handleChange(label, method)}
                    value={method}
                  />
                  <span style={{ marginLeft: "5px" }}>{method}</span>
                </List.Item>
              ))}
            </List.Item>
          )}
        </List>
      </div>
    );
  };
  

  const handleBackArrow = () => {
    setOpen(true);
    handleClose();
  };

  useEffect(() => {
    const anySelected = Object.values(isChecked).some((section) =>
      Object.values(section).some((checked) => checked)
    );
    setIsAnyMethodSelected(anySelected);
  }, [isChecked]);

    const renderFooter = () => (
    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
      <Button onClick={handleClose}>Cancel</Button>
      <Button
            type="primary"
            onClick={isAnyMethodSelected ? handleSubmit : null}
            disabled={!isAnyMethodSelected}
            style={{
              backgroundColor: isAnyMethodSelected ? "#8176f2" : "#c4c4c4",
              borderColor: isAnyMethodSelected ? "#8176f2" : "#c4c4c4",
              color: "white",
            }}
          >
            Submit
          </Button>
    </div>
  );
console.log("addNewRole...", addNewRole)

  return (
      <Modal
        open={isEdit ? isEdit : isActivatePopup}
        onCancel={handleClose}
        footer={renderFooter()}
        closable={false}
        onOk={handleClose}
        width={600}
        title={isEditActivate ? `Edit User Permissions` : `Add User Permissions`}
      >
        <div className={styles.header_box} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <ArrowLeftOutlined
            style={{ cursor: "pointer" }}
            onClick={handleBackArrow}
          />
          <div className={styles.header}>
            {pageName === "editRoles" ? "Activate/Deactivate Features" : ""}
          </div>
          {/* <CloseOutlined style={{ cursor: "pointer" }} onClick={handleClose} /> */}
        </div>
        {Object.entries(getPermission).map(([section, methods], index) => (
          <SwitchSection key={index} label={section} methods={methods} />
        ))}
        <Divider />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "1.5rem",
          }}
        >
        </div>
      </Modal>
  );
};

export default ActiveDeactive;
