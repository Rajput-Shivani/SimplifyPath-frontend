import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchITerm } from "../../redux/slices/globalSlice";
import Search from "antd/es/input/Search";
const SearchInput = ({onSearch, apiCall, placeholder}) => {
    const {searchTerm} = useSelector((state)=>state.globalReducer)
    const dispatch = useDispatch()

    const handleChange=(e)=>{
        dispatch(setSearchITerm(e.target.value))
        if(!searchTerm){
            apiCall()
        }
    }

    // const onSearch=()=>{

    // }
    const onReset=()=>{

    }

    useEffect(()=>{
        if(!searchTerm || searchTerm?.length === 0){
            dispatch(setSearchITerm(""))
            apiCall()
        }
    },[searchTerm])
  return (
    <>
     <Space.Compact style={{ width: '100%' }}>
      <Input size="small" placeholder={placeholder} value={searchTerm} name="searchTerm"  onChange={handleChange}/>
      {/* <Button size="large" type="primary">{searchTerm ? 'Reset' : 'Search'}</Button> */}
      {/* {searchTerm ?
       <Button size="large" type="primary">Reset</Button>
        : */}
        <Button onClick={onSearch} size="large" type="primary">Search</Button>
        {/* } */}
    </Space.Compact>
    </>
  );
};

export default SearchInput;
