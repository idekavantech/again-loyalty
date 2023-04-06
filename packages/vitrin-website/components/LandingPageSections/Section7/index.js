import { memo } from "react";
import PropTypes from "prop-types";
import SectionOfCity from "./City"
import SectionOfBusinessShopping from "./BusinessShopping"
import SectionOfBusinessNoShopping from "./BusinessNoShopping"

function Section7({ typeOfLanding, isShopping, name, xsb4, xsb14, refOfSampleSites, v22, v4, v23, xc9, v18, xc10, shop2, v25, v7, xc11, xb14, nameOfCity, xsbc3, xbc3 }) {
  const isCityPage = typeOfLanding === "city" && !isShopping;
  const isBusinessShoppingPage = (typeOfLanding === "business" || typeOfLanding === "both") && isShopping
  const isBusinessNoShoppingPage = (typeOfLanding === "business" || typeOfLanding === "both") && !isShopping

  switch (true) {
    case isCityPage:
      return <SectionOfCity
        cn={name}
        v22={v22}
        v4={v4}
        v23={v23}
        xc9={xc9}
        v18={v18}
        xc10={xc10}
        shop2={shop2}
        v25={v25}
        v7={v7}
        xc11={xc11}
      />
    case isBusinessShoppingPage:
      return <SectionOfBusinessShopping
        refOfSampleSites={refOfSampleSites}
        sbm={name}
        v22={v22}
        xsb4={xsb4}
        xsb14={xsb14}
        v7={v7}
        shop2={shop2}
        nameOfCity={nameOfCity}
        xsbc3={xsbc3}
        v23={v23}
      />

    case isBusinessNoShoppingPage:
      return <SectionOfBusinessNoShopping refOfSampleSites={refOfSampleSites} ibt={name} v22={v22} xb14={xb14} v4={v4} nameOfCity={nameOfCity}
      xbc3={xbc3} />
    default:
      return ""
  }

}

Section7.propTypes = {
  sbm: PropTypes.string.isRequired,
  xsb4: PropTypes.element.isRequired,
  xsb14: PropTypes.element.isRequired,
  refOfSampleSites: PropTypes.object.isRequired,
  cn: PropTypes.string.isRequired,
  v22: PropTypes.element.isRequired,
  v4: PropTypes.element.isRequired,
  v23: PropTypes.element.isRequired,
  xc9: PropTypes.element.isRequired,
  v18: PropTypes.element.isRequired,
  xc10: PropTypes.element.isRequired,
  shop2: PropTypes.element.isRequired,
  v25: PropTypes.element.isRequired,
  v7: PropTypes.element.isRequired,
  xc11: PropTypes.element.isRequired,
  xb14: PropTypes.element.isRequired,
  nameOfCity: PropTypes.string.isRequired,
  xsbc3: PropTypes.element.isRequired,
  xbc3: PropTypes.element.isRequired,
  typeOfLanding: PropTypes.string.isRequired,
  isShopping: PropTypes.bool.isRequired
}

export default memo(Section7)