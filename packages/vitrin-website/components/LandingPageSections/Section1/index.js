import { memo } from "react";
import PropTypes from "prop-types";
import SectionOfCity from "./City"
import SectionOfBusinessShopping from "./BusinessShopping"
import SectionOfBusinessNoShopping from "./BusinessNoShopping"

function Section1({ typeOfLanding, isShopping, refToExamples, refToPossibilities, formattedGmv, name, city, image }) {
  const isCityPage = typeOfLanding === "city" && !isShopping;
  const isBusinessShoppingPage = (typeOfLanding === "business" || typeOfLanding === "both") && isShopping
  const isBusinessNoShoppingPage = ((typeOfLanding === "business" || typeOfLanding === "both")) && !isShopping

  switch (true) {
    case isCityPage:
      return <SectionOfCity refToExamples={refToExamples} refToPossibilities={refToPossibilities} formattedGmv={formattedGmv} cn={name} image={image} />
    case isBusinessShoppingPage:
      return <SectionOfBusinessShopping refToExamples={refToExamples} refToPossibilities={refToPossibilities} formattedGmv={formattedGmv} image={image} sbm={name} cn={city} />

    case isBusinessNoShoppingPage:
      return <SectionOfBusinessNoShopping refToExamples={refToExamples} refToPossibilities={refToPossibilities} formattedGmv={formattedGmv} image={image} ibt={name} cn={city} />
    default:
      return ""
  }


}

Section1.propTypes = {
  refToExamples: PropTypes.object,
  refToPossibilities: PropTypes.object,
  formattedGmv: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  typeOfLanding: PropTypes.string.isRequired,
  isShopping: PropTypes.bool.isRequired
}

export default memo(Section1)