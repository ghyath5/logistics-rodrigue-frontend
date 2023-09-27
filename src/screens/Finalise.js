import React, { useEffect, useState } from "react";
import Layout from "../components/partials/Layout";
import Table from "../components/layout/Table";
import Loader from "../components/layout/Loader";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import { runsStatuses } from "../data/configs";
import NoDataPlaceHolder from "../components/layout/NoDataPlaceHolder";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select'
import BtnOutlined from "../components/layout/BtnOutlined";
import { DatePickerr } from "../components/layout/DatePickers";
import moment from "moment";
import { FormControl } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
const Runs = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [runs, setRuns] = useState([]);

  const [name, setName] =useState('');
  const [date,setDate]=useState(new Date())
  const handleNameChange = (event) => {

    setName(event.target.value);
    setDate(new Date())
  };
  const nav = useNavigate();
  const today = new Date();
  const columns = [
    {
      id: "driver",
      label: "Driver",
      minWidth: 100,
    },
    {
      id: "vehicle",
      label: "Vehicle",
      minWidth: 100,
    },
    {
      id: "date",
      label: "Date",
      minWidth: 100,
    },
    { id: "region", label: "Region", minWidth: 100 },
    { id: "ordersCount", label: "Orders", minWidth: 50 },
    {
      id: "status",
      label: "Status",
      minWidth: 100,
    },
    {
      id: "runDate",
      label: "Edit Date",
      minWidth: 100,
      class: ["viewRoute"],
      action: (id) => nav("/editrunDate", { state: { id: id } }),
    },
    {
      id: "viewOrders",
      label: "actions",
      minWidth: 100,
      class: ["viewRoute"],
      action: (id) => nav("/editrun", { state: { id: id } }),
    },
  ];

  useEffect(() => {
    fetchRuns();
  }, []);

  function createData(
    id,
    driver,
    vehicle,
    route,
    ordersCount,
    status,
    date,
    runDate,
    viewOrders
  ) {
    return {
      id,
      driver,
      vehicle,
      route,
      ordersCount,
      status,
      date,
      runDate,
      viewOrders,
    };
  }

  const handleFetch = () => {
    if (name !== '') {
      fetchRunsByDateOrName(name);
    } else {
      fetchRunsByDateOrName(date); 
    }
  };
  


  const fetchRunsByDateOrName =  (value) => {
    if (value) {
      const searchParam=`find=${value}`
      // const searchParam=`find=644163ca346f50453d26aef4`
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `/runs/findrun?${searchParam}&page=1&limit=1`,
        headers: { }
      };
      
      axios.request(config)
      .then((response) => {
        response.data.length>0 ?
        response.data.forEach((f) => {
          setRows([])
          setRows(() => [
          
            createData(
              f._id,
              f?.driver?.name,
              f?.vehicle?.plate,
              f.route?.name,
              f.orders.length,
              runsStatuses[f.status]?.label,
              new Date(f.date.split("T")[0]).toDateString(),
              "Edit Date",
              "View / Edit"
            ),
          ])

        }):(
          setRows([])
        )

      })
      .catch((error) => {
        console.log(error);
      });
    } 
  };
  
  
  const fetchRuns = async () => {
    setLoading(true);
    await axios
      .get("/runs")
      .then((res) => {
        // console.log(res.data)
        setRuns(res.data.runs);
        // console.log(res.data.runs[0])
        res.data.runs.forEach((f) => {
          console.log(f.orders[0].status)
          const orderStatusLabels = f.orders.map((order) => runsStatuses[order.status].label);

          setRows((prev) => [
            ...prev,
            createData(
              f._id,
              f?.driver?.name,
              f?.vehicle?.plate,
              f.route?.name,
              f.orders.length,
              orderStatusLabels,
              new Date(f.date.split("T")[0]).toDateString(),
              "Edit Date",
              "View / Edit"
            ),
          ])

        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const fetchDrivers = useQuery({
    queryKey: ["drivers"],
    queryFn: async () => {
      const response = await axios.get("/drivers");
      const data = await response.data.drivers;
      return data;
    },
  })
  
  return loading ? (
    <Loader />
  ) : (
    <Layout>
      <div className="d-flex justify-content-between mb-2">
        <h3 className={`headerss-${localStorage.getItem("monjay-theme")} my-2`}>
          Runs
        </h3>
      </div>
      <div className="finaliseTableContainer">
      <form className="d-flex align-items-center gap-2 flex-wrap mb-4">
     <div className="w-40 h-10">
  

<DatePickerr
  inputFormat="DD-MM-YYYY"
  views={["year", "month", "day"]}
  label="run date"
  id="runDate"
  name="runDate"
  value={date}
  handleChange={(e) =>{
    setDate(e.target.value)
    setName('')
  }}
  maxDate={moment(new Date()).format("L")}
/>
     </div>
      <div className="w-40 h-10 mt-3 ">
      <FormControl variant="outlined" style={{ width: '220px' }}>
      <InputLabel id="nameSelectLabel">Choose Name</InputLabel>
      <Select
        labelId="nameSelectLabel"
        id="nameSelect"
        value={name}
        label="Choose Name"
        onChange={handleNameChange}
      >
        
        {fetchDrivers.data.map((row,index) => {
          return(
            (
              <MenuItem key={index} value={row._id}>
                {row.name!==undefined ? row.name : null}
              </MenuItem>
            ))
            })}
      </Select>
    </FormControl>

      </div>

        <BtnOutlined classes={'mt-3'} disabled={false} title={"fetch"} handleClick={handleFetch}/>
      </form>

        {runs.length > 0 ? (
          <Table columns={columns} rows={rows} />
        ) : (
          <NoDataPlaceHolder current="Runs" />
        )}
      </div>
    </Layout>
  );
};

export default Runs;
