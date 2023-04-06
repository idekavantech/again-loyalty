import { memo } from "react";
import PropTypes from "prop-types";
import SectionOfCity from "./City"
import SectionOfBusinessShopping from "./BusinessShopping"
import SectionOfBusinessNoShopping from "./BusinessNoShopping"

function Section6({ typeOfLanding, isShopping, name, shop1, xsb4, xsb2Text, xsb1Text, xsb5, v36, v37, shop2, shop1Text, site, xc1, xc2Text, v19, v8, xc6, xc7, xb3, xb2, xb2Text, v1, v10, v17 }) {
  const isCityPage = typeOfLanding === "city" && !isShopping;
  const isBusinessShoppingPage = (typeOfLanding === "business" || typeOfLanding === "both") && isShopping
  const isBusinessNoShoppingPage = (typeOfLanding === "business" || typeOfLanding === "both") && !isShopping

  switch (true) {
    case isCityPage:
      return <SectionOfCity
        cn={name}
        shop2={shop2}
        shop1Text={shop1Text}
        site={site}
        xc1={xc1}
        xc2Text={xc2Text}
        v19={v19}
        v8={v8}
        xc6={xc6}
        xc7={xc7}
      />
    case isBusinessShoppingPage:
      return <SectionOfBusinessShopping
        sbm={name}
        shop2={shop2}
        shop1={shop1}
        site={site}
        xsb4={xsb4}
        xsb2Text={xsb2Text}
        xsb1Text={xsb1Text}
        xsb5={xsb5}
        v36={v36}
        v37={v37}
      />

    case isBusinessNoShoppingPage:
      return <SectionOfBusinessNoShopping
        ibt={name}
        xb3={xb3}
        xb2={xb2}
        xb2Text={xb2Text}
        v1={v1}
        v10={v10}
        v17={v17}
        site={site}
      />
    default:
      return ""
  }

}

Section6.propTypes = {
  sbm: PropTypes.string.isRequired,
  xsb4: PropTypes.element.isRequired,
  xsb2Text: PropTypes.string.isRequired,
  xsb1Text: PropTypes.string.isRequired,
  xsb5: PropTypes.element.isRequired,
  v36: PropTypes.element.isRequired,
  v37: PropTypes.element.isRequired,
  cn: PropTypes.string.isRequired,
  shop2: PropTypes.element.isRequired,
  shop1Text: PropTypes.string.isRequired,
  site: PropTypes.element.isRequired,
  xc1: PropTypes.element.isRequired,
  xc2Text: PropTypes.string.isRequired,
  v19: PropTypes.element.isRequired,
  v8: PropTypes.element.isRequired,
  xc6: PropTypes.element.isRequired,
  xc7: PropTypes.element.isRequired,
  ibt: PropTypes.string.isRequired,
  xb3: PropTypes.element.isRequired,
  xb2: PropTypes.element.isRequired,
  v1: PropTypes.element.isRequired,
  v10: PropTypes.element.isRequired,
  v17: PropTypes.element.isRequired,
  typeOfLanding: PropTypes.string.isRequired,
  isShopping: PropTypes.bool.isRequired
}

export default memo(Section6)