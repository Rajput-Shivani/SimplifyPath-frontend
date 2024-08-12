import { Checkbox, List, Switch } from "antd";
import { useEffect } from "react";
import styles from "./styles.module.scss";
import dropDown from "../../assets/dropdown.svg";

const SwitchSectionData = ({label , methods, setChecked, handleSwitchChange,isChecked,handleChange,handleDropdownClick,isDropdownOpen}) =>{

  useEffect(() => {
    // Set initial state based on label and methods
    setChecked(prev => ({
      ...prev,
      [label]: methods.reduce((acc, method) => {
        acc[method] = false; // Assuming default state for methods is unchecked
        return acc;
      }, {})
    }));
  }, [label, methods]);

  return (
   
    <div style={{ marginTop: "16px" }}>
    <List bordered size="large">
    <div
       className={
         isChecked[label] ? styles.active_section : styles.inactive_section
       }
       style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding:'15px' }}
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
}

export default SwitchSectionData