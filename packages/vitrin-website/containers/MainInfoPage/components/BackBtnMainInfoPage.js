import { useRouter } from "next/router";
import { memo } from "react";

const BackBtnMainInfoPage = ({ setCurrentState, currentState }) => {
  const router = useRouter();
  const onClick = () => {
    if (currentState.number === 1) {
      router.push("/cr~templates");
      return;
    }
    if (!!currentState.source) {
      setCurrentState({
        source: null,
        number: currentState.source,
      });
      return;
    }

    setCurrentState((prevState) => ({
      ...prevState,
      number: prevState.number - 1,
    }));
  };
  return (
    <button className="d-inline-block px-2" onClick={onClick}>
      <img
        src={"/images/arrow-right-gray.svg"}
        width="15px"
        height="20px"
        alt="back"
      />
    </button>
  );
};

export default memo(BackBtnMainInfoPage);
