import SefareshModal from "../Modal";
import InputLabel from "@saas/components/InputLabel";

function bodys() {
  return (
    <div style={{ padding: 20 }}>
      <InputLabel
        note="You can choose from acronyms for your product in the sales software and see the abbreviation on your device."
        placeholder="Product Name"
      />
    </div>
  );
}

export default function EditDeal({ isOpen, onClose }) {
  return (
    <SefareshModal
      isOpen={isOpen}
      title="Product editing"
      headerButtonText={"Store"}
      bodys={bodys}
      onClose={onClose}
    />
  );
}
