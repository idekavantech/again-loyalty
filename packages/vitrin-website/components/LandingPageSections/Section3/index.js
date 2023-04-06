import { memo } from "react";
import PropTypes from "prop-types";
import SectionOfCity from "./City"
import SectionOfBusinessShopping from "./BusinessShopping"
import SectionOfBusinessNoShopping from "./BusinessNoShopping"

function Section3({ typeOfLanding, isShopping, xc5, site, name, refOfPossibilitiesMobile, openCollapse, onToggleCollapse, v6, xsb2, shop2 }) {
  const isCityPage = typeOfLanding === "city" && !isShopping;
  const isBusinessShoppingPage = (typeOfLanding === "business" || typeOfLanding === "both") && isShopping
  const isBusinessNoShoppingPage = (typeOfLanding === "business" || typeOfLanding === "both") && !isShopping

  switch (true) {
    case isCityPage:
      return <SectionOfCity
        refOfPossibilitiesMobile={refOfPossibilitiesMobile}
        openCollapse={openCollapse}
        onToggleCollapse={onToggleCollapse}
        xc5={xc5}
        site={site}
        cn={name}
        shop2={shop2}
      />
    case isBusinessShoppingPage:
      return <SectionOfBusinessShopping
        refOfPossibilitiesMobile={refOfPossibilitiesMobile}
        openCollapse={openCollapse}
        onToggleCollapse={onToggleCollapse}
        xsb2={xsb2}
        v6={v6}
        shop2={shop2}
      />

    case isBusinessNoShoppingPage:
      return <SectionOfBusinessNoShopping
        refOfPossibilitiesMobile={refOfPossibilitiesMobile}
        openCollapse={openCollapse}
        onToggleCollapse={onToggleCollapse}
        ibt={name}
        site={site}
      />
    default:
      return ""
  }



}

Section3.propTypes = {
  xc5: PropTypes.element.isRequired,
  site: PropTypes.element.isRequired,
  cn: PropTypes.string.isRequired,
  refOfPossibilitiesMobile: PropTypes.object.isRequired,
  openCollapse: PropTypes.bool.isRequired,
  onToggleCollapse: PropTypes.func.isRequired,
  v6: PropTypes.element.isRequired,
  xsb2: PropTypes.element.isRequired,
  shop2: PropTypes.element.isRequired,
  typeOfLanding: PropTypes.string.isRequired,
  isShopping: PropTypes.bool.isRequired
}

export default memo(Section3)