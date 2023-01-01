import React, { useEffect, useState } from "react";
import BtnContained from "../components/layout/BtnContained";
import Layout from "../components/partials/Layout";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import PromotionItem from "../components/promotions/PromotionItem";
import Loader from "../components/layout/Loader";

const Promotions = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    await axios
      .get("promotion")
      .then((res) => {
        setPromotions(res.data.promotions);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleDeletePromotions = async (id) => {
    setPromotions((prev) => prev.filter((S) => S._id !== id));

    await axios
      .delete(`/promotion/${id}`)
      .then((res) => {
        console.log(res.data);
      })
      .catch(console.error);
  };

  return loading ? (
    <Loader />
  ) : (
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
        return (
          <PromotionItem
            key={i}
            prom={prom}
            deletePromotion={handleDeletePromotions}
          />
        );
      })}
    </Layout>
  );
};

export default Promotions;
