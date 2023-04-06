import { memo } from "react";
import PropTypes from "prop-types";
import SectionOfCity from "./City"
import SectionOfBusinessShopping from "./BusinessShopping"
import SectionOfBusinessNoShopping from "./BusinessNoShopping"

function Section4({ typeOfLanding, isShopping, name, v35, v4, v11Text, xsb5, xsb7, type, v3, v10, v14, v17, xc1, xc3, site, xb7, xb2, xsbc2, xbc2 }) {
  const isCityPage = typeOfLanding === "city" && !isShopping;
  const isBusinessShoppingPage = (typeOfLanding === "business" || typeOfLanding === "both") && isShopping
  const isBusinessNoShoppingPage = (typeOfLanding === "business" || typeOfLanding === "both") && !isShopping

  switch (true) {
    case isCityPage:
      return <SectionOfCity
        cn={name}
        v3={v3}
        v10={v10}
        v14={v14}
        v17={v17}
        xc1={xc1}
        xc3={xc3}
        type={type}
        site={site}
      />
    case isBusinessShoppingPage:
      return <SectionOfBusinessShopping
        sbm={name}
        v35={v35}
        v4={v4}
        v14={v14}
        v11Text={v11Text}
        xsb5={xsb5}
        xsb7={xsb7}
        type={type}
        xsbc2={xsbc2}
      />

    case isBusinessNoShoppingPage:
      return <SectionOfBusinessNoShopping
        ibt={name}
        v10={v10}
        xb7={xb7}
        v4={v4}
        xb2={xb2}
        xbc2={xbc2}
      />
    default:
      return ""
  }

}

Section4.propTypes = {
  name: PropTypes.string.isRequired,
  v35: PropTypes.element.isRequired,
  v4: PropTypes.element.isRequired,
  v11Text: PropTypes.string.isRequired,
  xsb5: PropTypes.element.isRequired,
  xsb7: PropTypes.element.isRequired,
  v3: PropTypes.element.isRequired,
  v10: PropTypes.element.isRequired,
  v14: PropTypes.element.isRequired,
  v17: PropTypes.element.isRequired,
  xc1: PropTypes.element.isRequired,
  xc3: PropTypes.element.isRequired,
  xb7: PropTypes.element.isRequired, 
  xb2: PropTypes.element.isRequired,
  type: PropTypes.element.isRequired,
  site: PropTypes.element.isRequired,
  xsbc2: PropTypes.element.isRequired,
  xbc2: PropTypes.element.isRequired,
  typeOfLanding: PropTypes.string.isRequired,
  isShopping: PropTypes.bool.isRequired
}

export default memo(Section4)