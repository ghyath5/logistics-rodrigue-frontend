/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import BtnContained from "../components/layout/BtnContained";
import BtnOutlined from "../components/layout/BtnOutlined";
import StatsCard from "../components/layout/StatsCard";
import Table from "../components/layout/Table";
import Layout from "../components/partials/Layout";
import Loader from "../components/layout/Loader";
import NoDataPlaceHolder from "../components/layout/NoDataPlaceHolder";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import DeleteModal from "../components/DeleteModal";
// import SureToDelete from "../components/SureToDelete";
import SearchInput from "../components/layout/SearchInput";
import debounce from "lodash.debounce";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [archived, setArchived] = useState(false);
  const [cantDeleteModal, setCantDeleteModalVisible] = useState(false);
  // const [sureToDeleteVisible, setSureToDeleteVisible] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [productsTotal, setProductsTotal] = useState(0);
  const [productsActive, setTotalActive] = useState(0);
  const [productsHidden, setProductsHidden] = useState(0);
  const [rows, setRows] = useState([]);
  const nav = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  // const [itemToDelete, setItemToDelete] = useState("");

  const columns = [
    { id: "code", label: "Code", minWidth: 100 },
    { id: "name", label: "Name", minWidth: 150 },
    {
      id: "category",
      label: "Category",
      minWidth: 150,
    },
    {
      id: "price",
      label: "Price",
      minWidth: 50,
    },
    {
      id: "units",
      label: "Units per box",
      minWidth: 50,
    },
    {
      id: "priority",
      label: "Priority",
      minWidth: 50,
    },
    {
      id: "status",
      label: "Status",
      minWidth: 100,
      class: ["statusCellVisible", "statusCellHidden"],
    },
    {
      id: "remove",
      label: archived ? "unarchive" : "Archive",
      minWidth: 100,
      class: ["tableDeleteBtn"],
      action: (id) => handleArchiveProduct(id),
      // action: (id) => handleRemoveProduct(id),
    },
    {
      id: "edit",
      label: "Edit ",
      minWidth: 100,
      class: ["tableEditBtn"],
      action: (id) => nav("/editproducts", { state: { id: id } }),
    },
  ];

  // const prepareDelete = async (id) => {
  //   setItemToDelete(id);
  //   setSureToDeleteVisible(true);
  // };

  // const handleRemoveProduct = async (id) => {
  //   await axios
  //     .delete(`/products/${id}`)
  //     .then(() => {
  //       let deletedProducts = allProducts.filter((p) => p._id === id)[0];
  //       deletedProducts.visibility === true
  //         ? setTotalActive((prev) => prev - 1)
  //         : setProductsHidden((prev) => prev - 1);

  //       setProductsTotal((prev) => prev - 1);
  //       setAllProducts((prev) => prev.filter((p) => p.id !== id));
  //       setRows((prev) => prev.filter((p) => p.id !== id));
  //     })
  //     .catch((err) => {
  //       if (err.response.status === 403) {
  //         setCantDeleteModalVisible(true);
  //       }
  //     })
  //     .finally(() => setLoading(false));
  // };

  function createData(
    id,
    code,
    name,
    category,
    price,
    units,
    priority,
    status,
    remove,
    edit
  ) {
    return {
      id,
      code,
      name,
      category,
      price,
      units,
      priority,
      status,
      remove,
      edit,
    };
  }

  useEffect(() => {
    fetchProducts();
  }, [archived]);

  const fetchProducts = async () => {
    setLoading(true);
    await axios
      .get(`/products?page=1&limit=100&isArchived=${archived}`)
      .then((res) => {
        setRows([]);
        setProductsTotal(res.data.productsCount);
        setTotalActive(res.data.visibleProducts);
        setProductsHidden(res.data.hiddenProducts);
        setAllProducts(res.data.products);

        res.data.products.forEach((p) => {
          setRows((prev) => [
            ...prev,
            createData(
              p._id,
              p.generatedCode,
              p.name,
              p.categoryId?.name,
              p.price,
              p.unitesperbox,
              p.prioritynumber,
              p.visibility === false ? "Hidden" : "Visible",
              archived ? "Unarchive" : "Archive",
              "Edit"
            ),
          ]);
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const searchForProducts = async (q) => {
    await axios
      .post(`/products/find?find=${q}`)
      .then((res) => {
        setRows([]);
        setAllProducts(res.data);

        res.data.forEach((p) => {
          setRows((prev) => [
            ...prev,
            createData(
              p._id,
              p.generatedCode,
              p.name,
              p.categoryId?.name,
              p.price,
              p.unitesperbox,
              p.prioritynumber,
              p.visibility === false ? "Hidden" : "Visible",
              "Delete",
              "Edit"
            ),
          ]);
        });
      })
      .catch(console.error);
  };

  const debouncedFilter = useCallback(
    debounce((q) => searchForProducts(q), 400),
    []
  );

  const handleSearchInputChange = (q) => {
    setSearchQuery(q);
    debouncedFilter(q);
  };

  const handleArchiveProduct = (id) => {
    setLoading(true);
    axios
      .put(`/products/${id}`, {
        isarchived: !archived,
      })
      .then(() => {
        let archivedproducts = allProducts.filter((p) => p._id === id)[0];
        archivedproducts.visibility === true
          ? setTotalActive((prev) => prev - 1)
          : setProductsHidden((prev) => prev - 1);

        setProductsTotal((prev) => prev - 1);
        setAllProducts((prev) => prev.filter((p) => p.id !== id));
        setRows((prev) => prev.filter((p) => p.id !== id));
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Layout>
      {/* {sureToDeleteVisible && (
        <SureToDelete
          setOpen={setSureToDeleteVisible}
          handleDelete={handleRemoveProduct}
          id={itemToDelete}
        />
      )} */}
      {cantDeleteModal && <DeleteModal setOpen={setCantDeleteModalVisible} />}
      <div className="pageHeader d-sm-flex justify-content-between align-items-center mb-4">
        <h3 className={`headerss-${localStorage.getItem("monjay-theme")}`}>
          Manage Products
        </h3>
        <div className="d-flex gap-2">
          <BtnContained
            title="Add Products"
            handleClick={() => nav("/addproducts")}
          />
          <BtnOutlined
            title="Manage categories"
            handleClick={() => nav("/managecategories")}
          />
        </div>
      </div>
      <div className="d-flex flex-wrap ">
        <StatsCard
          title="Total Products"
          value={productsTotal}
          classes="bgGreen"
          col={4}
        />
        <StatsCard
          title="Active Products"
          value={productsActive}
          classes="bgLightBlue"
          col={4}
        />
        <StatsCard
          title="Hidden Products"
          value={productsHidden}
          last={true}
          classes="bgYellow"
          col={4}
        />
      </div>
      <div className="d-flex justify-content-between align-items-center my-4">
        <div className="d-flex gap-2">
          {!archived ? (
            <>
              <BtnContained
                title="Active"
                handleClick={() => setArchived(false)}
              />
              <BtnOutlined
                title="Archived"
                handleClick={() => setArchived(true)}
              />
            </>
          ) : (
            <>
              <BtnOutlined
                title="Active"
                handleClick={() => setArchived(false)}
              />
              <BtnContained
                title="Archived"
                handleClick={() => setArchived(true)}
              />
            </>
          )}
        </div>
        <SearchInput value={searchQuery} setValue={handleSearchInputChange} />
      </div>
      {loading ? null : (
        <div>
          {rows.length > 0 ? (
            <Table columns={columns} rows={rows} />
          ) : (
            <NoDataPlaceHolder
              current={!archived ? "Products" : "Archived Products"}
            />
          )}
        </div>
      )}
    </Layout>
  );
};

export default Products;
