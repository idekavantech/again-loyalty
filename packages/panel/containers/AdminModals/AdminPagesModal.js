import Modal from "@saas/components/Modal";
import ModalHeader from "@saas/components/Modal/ModalHeader";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
const AdminPagesModal = ({ isOpen, onClose }) => {
  const desktopMatches = useMediaQuery("(min-width:768px)");
  return (
    <Modal
      isOpen={isOpen}
      style={{
        borderRadius: 8,
        margin: 0,
        maxWidth: desktopMatches ? 520 : 320,
        height: "fit-content",
      }}
      header={<ModalHeader onRightClick={onClose} />}
      body={
        <div className="p-4 text-right u-fontLarge">
          <p>
            Build and edit site pages, using your Laptop and PC Experience
            Provides you with better and easier. If possible from this
            Take action.
          </p>
        </div>
      }
      cta={
        <Button
          color="primary"
          variant="contained"
          className="w-100"
          onClick={onClose}
        >
          I realized
        </Button>
      }
    />
  );
};

export default AdminPagesModal;
