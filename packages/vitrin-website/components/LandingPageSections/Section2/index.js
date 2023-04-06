import { memo } from "react";
import PropTypes from "prop-types";
import SectionOfCity from "./City"
import SectionOfBusinessShopping from "./BusinessShopping"
import SectionOfBusinessNoShopping from "./BusinessNoShopping"

function Section2({ typeOfLanding, isShopping, name, v1, v3, v5, v6Text, v8, xc1, xc2, image, site, nameOfBusiness, xsb1, v6, v4, v9, v31, v33, v7, shop1, shop2, main, type, xb1, xb2, xb3, xsbc1, xbc1, v35, businessName }) {
  const isCityPage = typeOfLanding === "city" && !isShopping;
  const isBusinessShoppingPage = (typeOfLanding === "business" || typeOfLanding === "both") && isShopping
  const isBusinessNoShoppingPage = (typeOfLanding === "business" || typeOfLanding === "both") && !isShopping

  switch (true) {
    case isCityPage:
      return <SectionOfCity
        cn={name}
        v1={v1}
        v3={v3}
        v5={v5}
        v6Text={v6Text}
        v8={v8}
        xc1={xc1}
        xc2={xc2}
        xsbc1={xsbc1}
        xbc1={xbc1}
        businessName={businessName}
        shop1={shop1}
        v35={v35}
        image={image}
        site={site}
      />
    case isBusinessShoppingPage:
      return <SectionOfBusinessShopping
        sbm={name}
        image={image}
        nameOfBusiness={nameOfBusiness}
        xsb1={xsb1}
        v6={v6}
        v3={v3}
        v4={v4}
        v9={v9}
        v31={v31}
        v33={v33}
        v7={v7}
        site={site}
        shop1={shop1}
        shop2={shop2}
        main={main}
        type={type} />

    case isBusinessNoShoppingPage:
      return <SectionOfBusinessNoShopping
        nameOfBusiness={nameOfBusiness}
        xb1={xb1}
        xb2={xb2}
        xb3={xb3}
        v31={v31}
        v4={v4}
        v9={v9}
        ibt={name}
        main={main}
        site={site}
        shop1={shop1}
        image={image}
      />
    default:
      return ""
  }

}

Section2.propTypes = {
  name: PropTypes.string,
  v3: PropTypes.element,
  xc2: PropTypes.element,
  xc1: PropTypes.element,
  v8: PropTypes.element,
  v5: PropTypes.element,
  v6Text: PropTypes.string,
  v1: PropTypes.element,
  xc2: PropTypes.element,
  image: PropTypes.string,
  site: PropTypes.string,
  xsb1: PropTypes.element,
  v6: PropTypes.element,
  v4: PropTypes.element,
  v9: PropTypes.element,
  v31: PropTypes.element,
  v33: PropTypes.element,
  v7: PropTypes.element,
  shop1: PropTypes.element,
  shop2: PropTypes.element,
  main: PropTypes.element,
  type: PropTypes.element,
  nameOfBusiness: PropTypes.string,
  xb1: PropTypes.element,
  xb2: PropTypes.element,
  xb3: PropTypes.element,
  xsbc1: PropTypes.element,
  xbc1: PropTypes.element,
  v35: PropTypes.element,
  businessName: PropTypes.element.isRequired,
  typeOfLanding: PropTypes.string.isRequired,
  isShopping: PropTypes.bool.isRequired
}

export default memo(Section2)