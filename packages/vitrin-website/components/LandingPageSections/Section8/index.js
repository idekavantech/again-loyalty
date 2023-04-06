import { memo } from "react";
import PropTypes from "prop-types";
import SectionOfCity from "./City"
import SectionOfBusinessShopping from "./BusinessShopping"
import SectionOfBusinessNoShopping from "./BusinessNoShopping"

function Section8({ typeOfLanding, isShopping, name, main, shop1, xsb11, xb11Text, xsb3, xsb13, v2, v9, v6, v4, xc12, xc15, v3, v19, site, v31, v5, xc13, xc8, xc14, xc7, v30, v13, v23, v32, xb11, xb2, v37, xsbc4, xbc4 }) {
  const isCityPage = typeOfLanding === "city" && !isShopping;
  const isBusinessShoppingPage = (typeOfLanding === "business" || typeOfLanding === "both") && isShopping
  const isBusinessNoShoppingPage = (typeOfLanding === "business" || typeOfLanding === "both") && !isShopping

  switch (true) {
    case isCityPage:
      return <SectionOfCity
        cn={name}
        xc12={xc12}
        xc15={xc15}
        v3={v3}
        v19={v19}
        site={site}
        v31={v31}
        v5={v5}
        xc13={xc13}
        xc8={xc8}
        xc14={xc14}
        xc7={xc7}
        v30={v30}
        v13={v13}
        v23={v23}
        v32={v32}
      />
    case isBusinessShoppingPage:
      return <SectionOfBusinessShopping
        main={main}
        sbm={name}
        shop1={shop1}
        xsb11={xsb11}
        xsb3={xsb3}
        xsb13={xsb13}
        v2={v2}
        v30={v30}
        site={site}
        v9={v9}
        v6={v6}
        v4={v4}
        xsbc4={xsbc4}
      />

    case isBusinessNoShoppingPage:
      return <SectionOfBusinessNoShopping ibt={name} v31={v31} xb11={xb11} xb11Text={xb11Text} xb2={xb2} main={main} site={site} v4={v4} v37={v37} xbc4={xbc4} />
    default:
      return ""
  }

}

Section8.propTypes = {
  sbm: PropTypes.string.isRequired,
  main: PropTypes.element.isRequired,
  shop1: PropTypes.element.isRequired,
  xsb11: PropTypes.element.isRequired,
  xsb3: PropTypes.element.isRequired,
  xsb13: PropTypes.element.isRequired,
  v2: PropTypes.element.isRequired,
  v9: PropTypes.element.isRequired,
  v6: PropTypes.element.isRequired,
  v4: PropTypes.element.isRequired,
  cn: PropTypes.string.isRequired,
  xc12: PropTypes.element.isRequired,
  xc15: PropTypes.element.isRequired,
  v3: PropTypes.element.isRequired,
  v19: PropTypes.element.isRequired,
  site: PropTypes.element.isRequired,
  v31: PropTypes.element.isRequired,
  v5: PropTypes.element.isRequired,
  xc13: PropTypes.element.isRequired,
  xc8: PropTypes.element.isRequired,
  xc14: PropTypes.element.isRequired,
  xc7: PropTypes.element.isRequired,
  v30: PropTypes.element.isRequired,
  v13: PropTypes.element.isRequired,
  v23: PropTypes.element.isRequired,
  v32: PropTypes.element.isRequired,
  xb11: PropTypes.element.isRequired,
  xb11Text: PropTypes.string.isRequired,
  xb2: PropTypes.element.isRequired,
  v37: PropTypes.element.isRequired,
  xsbc4: PropTypes.element.isRequired,
  xbc4: PropTypes.element.isRequired,
  typeOfLanding: PropTypes.string.isRequired,
  isShopping: PropTypes.bool.isRequired
}

export default memo(Section8)