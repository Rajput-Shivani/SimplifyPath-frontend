import React, { useEffect, useState } from "react";
import CommanTable from "../../components/table/CommanTable";
import { ApartmentOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getOrganizationData } from "../../redux/slices/organizationSlice";
import { useNavigate } from "react-router-dom";

export const Organization = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [data, setData] = useState([
    {
      key: 1,
      name: "John Brown",
      domain: "Admin",
      companyEmail: "Admintft@gmail.com",
      status: "Verified",
    },
    {
      key: 1,
      name: "John Brown",
      domain: "Employee",
      companyEmail: "Admintft@gmail.com",
      status: "Verified",
    },
  ]);

  const {
    page,
    limit,
    searchItem,
    sortConfig,
    searchInput,
    selectedOptionData,
  } = useSelector((state) => state.globalReducer);
  const {organisations} = useSelector((state)=>state.organizationReducer)

  const [visibleColumns, setVisibleColumns] = useState({
    sNo: true,
    name: true,
    domain: false,
    companyEmail: true,
    status: false,
  });

  const handleEdit = (record) => {
    // Implement edit functionality
  };

  const handleDelete = (keys) => {
    setData((prevData) => prevData.filter((item) => !keys.includes(item.key)));
  };

  useEffect(()=>{
    dispatch(getOrganizationData(
      { page:page, limit:limit, navigate:navigate, searchQuery:searchInput || "", 
        sortKey: sortConfig.key,
        sortDirection: sortConfig.direction, }
    ))
  },[])
console.log("organisations", organisations)
  return (
    <CommanTable
      title="Organization"
      data={data}
      onEdit={handleEdit}
      onDelete={handleDelete}
      visibleColumns={visibleColumns}
      setVisibleColumns={setVisibleColumns}
      icon={<ApartmentOutlined className="icon-size text-white"/>}
      isAdd={false}
    />
  );
};
