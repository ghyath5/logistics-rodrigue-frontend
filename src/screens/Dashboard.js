import React, { useEffect, useState } from "react";
import BtnContained from "../components/layout/BtnContained";
import StatsCard from "../components/layout/StatsCard";
import Loader from "../components/layout/Loader";
import Layout from "../components/partials/Layout";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import LinearChart from "../components/LinearChart";
import PieChart from "../components/PieChart";
import axios from "../axios";
import faker from "faker";
import { DatePickerr } from "../components/layout/DatePickers";
import moment from "moment";

const Dashboard = () => {
  const navigate = useNavigate();

  const [theme, setTheme] = useState("light");
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState("");
  const [dashData, setDashData] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const [M1, setM1] = useState(new Date());
  const [M2, setM2] = useState(new Date());
  const [topCustomers, setTopCustomers] = useState({ data: [], labels: [] });
  const [lineChartData, setLineChartData] = useState([
    { dataSet1: [], dataSet2: [], labels: [] },
  ]);

  useEffect(() => {
    let t = localStorage.getItem("monjay-theme");
    setTheme(t);
    setUser(Cookies.get("monjayUser"));
    fetchPieStatistics();
  }, []);

  const fetchPieStatistics = async () => {
    setLoading(true);
    await axios
      .get("/customers/get-top")
      .then((res) => {
        setDashData([res.data.todayOrders, res.data.todayRuns]);
        setTopCustomers({ data: res.data.data, labels: res.data.labels });
      })
      .then(fetchCategoriesStatistics)
      .then(fetchStatistics)
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      });
  };

  const fetchCategoriesStatistics = async () => {
    await axios
      .get("/products/get-top-by-category?total=5")
      .then((res) => {
        let value = [];
        res.data.forEach((el) => {
          value.push(
            el.data.map((val) => {
              return Math.round(val);
            })
          );
        });

        value.forEach((val, i) => {
          setTopCategories((prev) => [
            ...prev,
            {
              data: [...val],
              labels: [...res.data[i].labels],
              title: res.data[i].title,
            },
          ]);
        });
      })
      .catch(console.error);
  };

  const fetchStatistics = async () => {
    const labels = [...Array(31).keys()];

    let m1 = moment(new Date(M1)).add(1, "months");
    let m2 = moment(new Date(M2)).add(1, "months");

    await axios
      .get(
        `/statistics/sales-by-date-range?to1=${m1.format("YYYY")}-${m1.format(
          "MM"
        )}-01&to2=${m2.format("YYYY")}-${m2.format("MM")}-01&days=30`
      )
      .then((res) => {
        setLineChartData([
          {
            // dataSet1: res.data.dataset1,
            // dataSet2: res.data.dataset2,
            dataSet1: labels.map(() =>
              faker.datatype.number({ min: 200, max: 800 })
            ),
            dataSet2: labels.map(() =>
              faker.datatype.number({ min: 200, max: 800 })
            ),
            labels: labels,
          },
        ]);
      })
      .catch(console.error);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div className="mainDashboardContainer dashboardBg position-relative">
        <div className="dashboardBgCover"></div>
        <div className="dashboardTitleContainer text-white">
          <h6>Welcome back</h6>
          <h3 className="text-capitalize">{user}</h3>
          <BtnContained
            title="MANAGE MY INVENTORY"
            handleClick={() => {
              navigate("/products");
            }}
          />
        </div>
      </div>
      <Layout dashboard>
        <h3 className={`headerss-${theme} mb-2 mt-0`}>
          Today's Schedule Overview
        </h3>
        <div className="row m-0">
          <StatsCard
            title="Orders"
            value={dashData[0]}
            desc="Need confirming for tomorrow"
            classes="bgGreen"
            col={6}
          />
          <StatsCard
            title="runs"
            value={dashData[1]}
            desc="Scheduled for tomorrow"
            classes="bgYellow"
            col={6}
          />
        </div>
        <div className="row gapY mt-4">
          <div className="mx-auto mt-3 col-sm-12 col-md-5">
            <PieChart
              // data={[20, 10, 6, 13, 50, 1]}
              // names={["Alexander", "Marshall", "Zaiden", "Reuben", "Alberto"]}
              data={topCustomers.data}
              names={topCustomers.labels}
              title="Top 5 Customers"
            />
          </div>
          {topCategories.map((cat, i) => {
            return (
              cat.data.length > 0 && (
                <div key={i} className="mx-auto mt-3 col-sm-12 col-md-5">
                  <PieChart
                    data={cat.data}
                    names={cat.labels}
                    title={`Top 5 Products in ${cat.title}`}
                  />
                </div>
              )
            );
          })}
          {/* <div className="mx-auto mt-3 col-sm-12 col-md-5">
            <PieChart
              data={[30, 19, 22, 5, 16, 40]}
              names={["John Doe", "Hart", "Barlowe", "Larry", "Kristian"]}
              title="Top 5 Products in Dips"
            />
          </div>
          <div className="mx-auto mt-3 col-sm-12 col-md-5">
            <PieChart
              data={[20, 10, 6, 13, 50, 1]}
              names={["Alexander", "Marshall", "Zaiden", "Reuben", "Alberto"]}
              title="Top 5 Products in Deserts"
            />
          </div>
          <div className="mx-auto mt-3 col-sm-12 col-md-5">
            <PieChart
              data={[20, 10, 6, 13, 50, 1]}
              names={["Alexander", "Marshall", "Zaiden", "Reuben", "Alberto"]}
              title="Top 5 Products in Finger Food"
            />
          </div> */}
          <div className="lineshartContainer mt-5 mx-auto">
            <LinearChart data={lineChartData[0]} />
          </div>
          <div className="d-flex justify-content-center align-items-end gap-3">
            <DatePickerr
              inputFormat="MM-YY"
              views={["year", "month"]}
              lable="First month"
              id="orderDate"
              name="orderDate"
              value={M1}
              handleChange={(e) => setM1(e.target.value)}
            />
            <DatePickerr
              inputFormat="MM-YY"
              views={["year", "month"]}
              lable="Second month"
              id="orderDate"
              name="orderDate"
              value={M2}
              handleChange={(e) => setM2(e.target.value)}
            />
            <BtnContained
              title="COMPARE"
              handleClick={fetchStatistics}
              classes="p-2"
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
