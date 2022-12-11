import React, { useEffect, useState } from "react";
import BtnContained from "../components/layout/BtnContained";
import Layout from "../components/partials/Layout";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import PromotionItem from "../components/promotions/PromotionItem";

const Promotions = () => {
  const nav = useNavigate();
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    axios
      .get("promotion")
      .then((res) => {
        setPromotions(res.data);
        console.log(res.data);
      })
      .catch(console.error);
  }, []);

  return (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="headerTitle my-2">Promotions</h3>
        </div>
        <div>
          <BtnContained
            title="Add Promotion"
            handleClick={() => nav("/addPromotion")}
          />
        </div>
      </div>
      {promotions?.map((prom, i) => {
        return <PromotionItem key={i} prom={prom} />;
      })}
    </Layout>
  );
};

export default Promotions;
