import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// pages & components
// Admin Panel
import AdminPanel from "./adminPanel/AdminPanel";
// Inventory Panel
import HomeA from "./inventoryControl/pages/Home";
import AddItems from "./inventoryControl/pages/AddItems";
import UpdateItemPage from "./inventoryControl/pages/UpdateItemPage";
import NotificationPage from "./inventoryControl/pages/Notification";
// Supplier Panel
import AddSup from "./supplierPanel/components/AddSupp";
import AllSuppliers from "./supplierPanel/components/AllSup";
import UpdateSupplier from "./supplierPanel/components/UpdateSupplier";
import AddOrder from "./supplierPanel/components/AddOrder";
import AllOrders from "./supplierPanel/components/AllOrders";
import UpdateOrder from "./supplierPanel/components/UpdateOrder";
// Feedback Panel
import FeedBack from "./feedbackPanel/pages/Feedback";
import AdminTableFeedback from "./feedbackPanel/pages/AdminTableFeedback";
import AskQuestion from "./feedbackPanel/pages/Question";
import UserTable from "./feedbackPanel/pages/UserTable";
// Marketing Panel
import Promotion from "./marketingPanel/pages/Promotion";
import PromotionTable from "./marketingPanel/pages/PromotionTable";
import Promotionview from "./marketingPanel/pages/PromotionView";
import Promotionmain from "./marketingPanel/pages/main";

// Tracking Parcel
import AdminLogin from "./trackingComponent/admin/AdminLogin";
import UserRegister from "./trackingComponent/user/Register";
import AdminDashBoard from "./trackingComponent/admin/AdminMain";
import Admin_DashBoard from "./trackingComponent/admin/DashBoard";
import TrackingPage from "./trackingComponent/user/ParcelForm";
import Home from "./trackingComponent/Common/Home";
import EditParcel from "./trackingComponent/admin/EditParcel";
import HowToUse from "./trackingComponent/admin/Component/HowToUse";
import HandelAuth from "./trackingComponent/Common/auth/HandleAuth";
import DashboardReport from "./trackingComponent/admin/DashboardReport";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/AdminPanel" element={<AdminPanel />} />

      <Route path="/inventoryPanel" element={<HomeA />} />
      <Route path="/inventoryPanel/addItems" element={<AddItems />} />
      <Route path="/inventoryPanel/item/:id" element={<UpdateItemPage />} />
      <Route
        path="/inventoryPanel/notification"
        element={<NotificationPage />}
      />

      <Route path="/supplierPanel" element={<AllSuppliers />} />
      <Route path="/supplierPanel/add" element={<AddSup />} />
      <Route path="/supplierPanel/update/:nic" element={<UpdateSupplier />} />
      <Route path="/supplierPanel/updat/:oid" element={<UpdateOrder />} />
      <Route path="/supplierPanel/addOrder" element={<AddOrder />} />
      <Route path="/supplierPanel/allOrders" element={<AllOrders />} />

      {/* <Route path="/feedbackPanel" element={<FeedBack />} /> */}
      <Route path="/feedbackPanel" element={<UserTable />} />
      {/* <Route path="/feedbackPanel/feedbackTable" element={<AdminTableFeedback />} /> */}
      {/* <Route path="/feedbackPanel/askQuestion" element={<AskQuestion />} /> */}

      <Route path="/marketingPanel" element={<Promotionmain />} />
      <Route path="/marketingPanel/promotionmain" element={<Promotion />} />
      <Route
        path="/marketingPanel/promotionTable"
        element={<PromotionTable />}
      />
      <Route path="/marketingPanel/promotionview" element={<Promotionview />} />

      {/* Tracking Routes  */}
      <Route path="/" element={<TrackingPage />} />
      <Route path="/login" element={<AdminLogin />} />
      <Route element={<HandelAuth />}>
        <Route path="/report" element={<DashboardReport />} />
      </Route>

      <Route path="/register" element={<UserRegister />} />
      <Route path="/parcel" element={<TrackingPage />} />
      <Route element={<HandelAuth />}>
        <Route path="/edit" element={<EditParcel />} />
      </Route>
      <Route element={<HandelAuth />}>
        <Route path="/howto" element={<HowToUse />} />
      </Route>
      <Route path="/report" element={<DashboardReport />} />
      <Route path="/test" element={<AdminDashBoard />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
