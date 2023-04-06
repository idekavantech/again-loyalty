import KeyboardArrowLeftRoundedIcon from "@material-ui/icons/KeyboardArrowLeftRounded";
import Link from "next/link";
const BreadCrumb = ({ text, link }) => {
  return (
    <div className="container">
      <div
        className="my-4 p-2 d-flex  align-items-center"
        style={{
          width: "fit-content",
        }}
      >
        <Link href="/">ویترین</Link>
        <KeyboardArrowLeftRoundedIcon />
        <Link href={link}>{text}</Link>
      </div>
    </div>
  );
};

export default BreadCrumb;
