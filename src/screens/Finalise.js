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
const Runs = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [allRuns, setRuns] = useState([]);

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

  console.log(allRuns)

  const handleFetch = () => {
    console.log('im in');
    if (name !== '') {
      console.log('fetching by name', name);
      fetchRunsByDateOrName(name); // Call your fetch function with the name parameter
    } else {
      console.log('fetching by date', date);
    //  let updatedDate=date.split("T")[0]
 
    let updatedDate=date.toISOString().split('T')[0];
    // updatedDate=updatedDate.split("T")[0]
  console.log('Formatted Date:', updatedDate);
      fetchRunsByDateOrName(updatedDate); // Call your fetch function with the date parameter
    }
  };
  


  const fetchRunsByDateOrName = async (value) => {
    // setLoading(true);
  
    // Check if value is not empty
    if (value) {
      // const searchParam = `find=636f760789b01d04a624e72c`;   

      const searchParam=`find${value}`
      // console.log(`/runs/findRun?${searchParam}&page=1&limit=1`)
      console.log(`/runs/6476fd98b4bce62922cbf481`)
      await axios
        .get(`/runs/6476fd98b4bce62922cbf481`)
        .then((res) => {
          setRuns(res.data);
          // console.log('allRuns',allRuns)




          const formattedRuns = allRuns.map((f) => ({
            _id: f._id,
            driverName: f?.driver?.name,
            vehiclePlate: f?.vehicle?.plate,
            routeName: f.route?.name,
            ordersLength: f.orders.length,
            statusLabel: runsStatuses[f.status].label,
            formattedDate: new Date(f.date).toLocaleDateString(),
            editAction: "Edit Date",
            viewEditAction: "View / Edit",
          }));

          console.log(formattedRuns)
          
          setRows(formattedRuns);

          // res.data.forEach((f) => {
          //   setRows((prev) => [
          //     ...prev,
          //     createData(
          //       f._id,
          //       f?.driver?.name,
          //       f?.vehicle?.plate,
          //       f.route?.name,
          //       f.orders.length,
          //       runsStatuses[f.status].label,
          //       new Date(f.date.split("T")[0]).toDateString(),
          //       "Edit Date",
          //       "View / Edit"
          //     ),
          //   ]);
          // });

        })
        .catch(console.error)
        .finally(() => setLoading(false));
    } 


  };
  
  
  const fetchRuns = async () => {
    setLoading(true);
    await axios
      .get("/runs")
      .then((res) => {
        setRuns(res.data.runs);
        res.data.runs.forEach((f) => {
          setRows((prev) => [
            ...prev,
            createData(
              f._id,
              f?.driver?.name,
              f?.vehicle?.plate,
              f.route?.name,
              f.orders.length,
              runsStatuses[f.status].label,
              new Date(f.date.split("T")[0]).toDateString(),
              "Edit Date",
              "View / Edit"
            ),
          ])
          console.log(rows)

        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };



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
        
        {rows.map((row) => {
          console.log(row)
          return(
            (
              <MenuItem key={row._id} value={row.driverName}>
                {row.driver!==undefined ? row.driver : null}
              </MenuItem>
            ))
            })}
      </Select>
    </FormControl>

      </div>

        <BtnOutlined classes={'mt-3'} disabled={false} title={"fetch"} handleClick={handleFetch}/>
      </form>

        {allRuns.length > 0 ? (
          <Table columns={columns} rows={rows} />
        ) : (
          <NoDataPlaceHolder current="Runs" />
        )}
      </div>
    </Layout>
  );
};

export default Runs;
