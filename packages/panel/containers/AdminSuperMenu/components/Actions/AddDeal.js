import SefareshModal from "../Modal";
import InputLabel from "@saas/components/InputLabel";

function bodys() {
  return (
    <div style={{ padding: 20 }}>
      <InputLabel
        note="شما میتوانید از نام های اختصاری برای محصول خود در نرم افزار فروش انتخاب کرده و در دستگاه پوز خود اسامی اختصاری را مشاهده کنید "
        placeholder="نام محصول"
      />
    </div>
  );
}

export default function EditDeal({ isOpen, onClose }) {
  return (
    <SefareshModal
      isOpen={isOpen}
      title="ویرایش محصول"
      headerButtonText={"ذخیره"}
      bodys={bodys}
      onClose={onClose}
    />
  );
}
