import Image from "next/image";
import PropTypes from "prop-types";
import { Collapse } from "react-collapse";
import Divider from '@material-ui/core/Divider';

function Section10({ title, isOpened, onOpen, onClose, openBtnText = "ادامه", closeBtnText = "بستن", ...props }) {

  function handleClick() {
    if (isOpened) onClose()
    else onOpen()
  }

  return <div style={{ backgroundColor: "#F6F6F7" }}>
    <div className="container">
      <div
        style={{
          padding: "32px 0 24px",
          textAlign: "center",
          lineHeight: "28px",
          color: "#202223",
        }}
      >
        <div className="more-content px-2 py-3">
          {/* Title */}
          <p className="mb-2">{title}</p>
          <Divider />
          {/* Collapsed content */}
          <Collapse isOpened={isOpened}>
            <div className="collapsed-content py-3 px-4">
              {props.children}
            </div>
            <Divider />
          </Collapse>
          {/* Open/Close btn */}
          <div className="actions-content text-center pt-2">
            <button onClick={handleClick}>
              <span className="ml-2">{isOpened ? closeBtnText : openBtnText}</span>
              {isOpened ?
                <Image alt="" src={"/images/arrow-up.png"} width={10} height={5} priority unoptimized />
                :
                <Image alt="" src={"/images/arrow-down.png"} width={10} height={5} priority unoptimized />
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
}

Section10.propTypes = {
  title: PropTypes.string.isRequired,
  isOpened: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  openBtnText: PropTypes.string,
  closeBtnText: PropTypes.string
}

export default Section10