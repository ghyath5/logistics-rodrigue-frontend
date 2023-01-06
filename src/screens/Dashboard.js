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

const Dashboard = () => {
  const navigate = useNavigate();

  const [theme, setTheme] = useState("light");
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    let t = localStorage.getItem("monjay-theme");
    setTheme(t);
    setUser(Cookies.get("monjayUser"));
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    await axios
      .get(
        "/statistics/sales-by-date-range?to1=2023-01-10&to2=2022-12-10&days=30"
      )
      .then((res) => {
        // console.log(res.data);
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      });
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
        <h3 className={`headerss-${theme} mb-2 mt-0`}>Schedule Overview</h3>
        <div className="row m-0">
          <StatsCard
            title="Orders"
            value={1}
            desc="Need confirming for tomorrow"
            classes="bgYellow"
            col={4}
          />
          <StatsCard
            title="Deliveries"
            value={5}
            desc="Scheduled for tomorrow"
            classes="bgGreen"
            col={4}
          />
          <StatsCard
            title="Drivers"
            value={4}
            desc="Scheduled for tomorrow"
            classes="bgRed"
            last={true}
            col={4}
          />
        </div>
        <div className="mt-4">
          <div className="d-flex justify-content-around">
            {/* <div className="w-100 mx-3 mt-3 p-3">
              <PieChart
                data={[30, 19, 22, 5, 16, 40]}
                names={["John", "Hart", "Barlowe", "Larry", "Kristian"]}
                title="Top 5 Products"
              />
            </div> */}
            <div className="w-50 mx-3 mt-3 p-3">
              <PieChart
                data={[20, 10, 6, 13, 50, 1]}
                names={["Alexander", "Marshall", "Zaiden", "Reuben", "Alberto"]}
                title="Top 5 Customers"
                labelsPosition="right"
              />
            </div>
          </div>
          <div className="d-flex justify-content-around">
            <div className="w-100 mx-3 mt-3 p-3">
              <PieChart
                data={[30, 19, 22, 5, 16, 40]}
                names={["John", "Hart", "Barlowe", "Larry", "Kristian"]}
                title="Top 5 Products in Dips"
              />
            </div>
            <div className="w-100 mx-3 mt-3 p-3">
              <PieChart
                data={[20, 10, 6, 13, 50, 1]}
                names={["Alexander", "Marshall", "Zaiden", "Reuben", "Alberto"]}
                title="Top 5 Products in Deserts"
              />
            </div>
            <div className="w-100 mx-3 mt-3 p-3">
              <PieChart
                data={[20, 10, 6, 13, 50, 1]}
                names={["Alexander", "Marshall", "Zaiden", "Reuben", "Alberto"]}
                title="Top 5 Products in Finger Food"
              />
            </div>
          </div>
          <div className="lineshartContainer my-5 mx-auto">
            <LinearChart />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Dashboard;
