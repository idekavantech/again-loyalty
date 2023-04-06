import HeaderAdminBusinessOwner from "./components/Header";
import BusinessOwnerInfoForm from "./containers/Form";

export default function AdminBusinessOwnerInfo() {
  return (
    <div className="py-5" style={{ background: "#F6F6F7" }}>
      <div className="container">
        <HeaderAdminBusinessOwner />
        <BusinessOwnerInfoForm />
      </div>
    </div>
  );
}
