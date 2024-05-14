import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import "./style.css";
import image1 from "./Components/images/Blue.jpg";
import image2 from "./Components/images/Blue (2).jpg";
import image3 from "./Components/images/Blue (3).jpg";
import image4 from "./Components/images/Blue (4).jpg";
import image5 from "./Components/images/Blue (5).jpg";
const panelData = [
  {
    imgSrc: image1,
    alt: "inventory-panel",
    route: "/inventoryPanel",
    label: "Inventory Control Panel",
  },
  {
    imgSrc: image2,
    alt: "supplier-panel",
    route: "/supplierPanel",
    label: "Supplier Management Panel",
  },
  {
    imgSrc: image3,

    alt: "customer-service-panel",
    route: "/feedbackPanel",
    label: "Customer Service Management Panel",
  },
  {
    imgSrc: image4,

    alt: "marketing-panel",
    route: "/marketingPanel",
    label: "Marketing Management Panel",
  },
  {
    imgSrc: image5,

    alt: "parcelTracking-panel",
    route: "/edit",
    label: "Parcel Tracking Management Panel",
  },
];

function AdminPanel() {
  const navigate = useNavigate();

  const renderPanelBoxes = () => {
    return panelData.map((panel, index) => (
      <div
        className="panel-box"
        key={index}
        onClick={() => navigate(panel.route)}
      >
        <div className="inner-box">
          <img src={panel.imgSrc} alt={panel.alt} className="panel-box-img" />
          <p>{panel.label}</p>
        </div>
      </div>
    ));
  };

  return (
    <>
      <Navbar />
      <div className="admin-panel-header">
        <h1 style={{ fontSize: "60px", textAlign: "center" }}>Admin Panel</h1>{" "}
      </div>
      <div className="body-container">{renderPanelBoxes()}</div>
      <Footer />
    </>
  );
}

export default AdminPanel;
