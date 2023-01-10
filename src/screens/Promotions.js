import React, { useEffect, useState } from "react";
import BtnContained from "../components/layout/BtnContained";
import Layout from "../components/partials/Layout";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import PromotionItem from "../components/promotions/PromotionItem";
import Loader from "../components/layout/Loader";
import NoDataPlaceHolder from "../components/layout/NoDataPlaceHolder";
import DeleteModal from "../components/DeleteModal";

const Promotions = () => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [promotions, setPromotions] = useState([]);
  const [cantDeleteModal, setCantDeleteModalVisible] = useState(false);

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
    await axios
      .delete(`/promotion/${id}`)
      .then((res) => {
        setPromotions((prev) => prev.filter((S) => S._id !== id));
      })
      .catch((err) => {
        if (err.response.status === 403) {
          setCantDeleteModalVisible(true);
        }
      });
  };

  return loading ? (
    <Loader />
  ) : (
    <Layout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        {cantDeleteModal && <DeleteModal setOpen={setCantDeleteModalVisible} />}
        <div>
          <h3
            className={`headerss-${localStorage.getItem("monjay-theme")} my-2`}
          >
            Promotions
          </h3>
        </div>
        <div>
          <BtnContained
            title="Add Promotion"
            handleClick={() => nav("/addPromotion")}
          />
        </div>
      </div>
      {promotions.length === 0 ? (
        <NoDataPlaceHolder />
      ) : (
        promotions?.map((prom, i) => {
          return (
            <PromotionItem
              key={i}
              prom={prom}
              deletePromotion={handleDeletePromotions}
            />
          );
        })
      )}
    </Layout>
  );
};

export default Promotions;
