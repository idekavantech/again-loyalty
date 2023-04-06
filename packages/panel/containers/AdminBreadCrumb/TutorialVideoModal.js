import ModalHeader from "@saas/components/Modal/ModalHeader";
import Modal from "@saas/components/Modal";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const TutorialVideoModal = ({ videoUrl, title, setShowModal, showModal }) => {
  const desktopMatches = useMediaQuery("(min-width:768px)");

  return (
    <Modal
      onClose={() => setShowModal(false)}
      isOpen={showModal}
      style={{
        borderRadius: 8,
        margin: 0,
        maxWidth: desktopMatches ? 520 : 320,
        height: "fit-content",
      }}
      header={
        <ModalHeader
          onRightClick={() => setShowModal(false)}
          style={{
            fontSize: 20,
            fontWeight: 500,
            lineHeight: "32px",
            color: "#202223",
          }}
          title={`ویدیو آموزشی ${title}`}
        />
      }
      body={
        <video autoPlay className="w-100 d-flex" controls>
          <source src={videoUrl} />
          Your browser does not support the video tag.
        </video>
      }
    />
  );
};

export default TutorialVideoModal;
