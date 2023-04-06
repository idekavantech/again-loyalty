import Image from "next/image";
import Badge from "@material-ui/core/Badge";
import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

const NotificationCard = ({
  img,
  title,
  click,
  desktopMatches,
  className,
  badgeContent,
}) => {
  return (
    <div
      className={`d-flex align-items-center p-0 p-xl-4  w-100 ‍‍‍‍‍notification-card ${
        badgeContent ? "active" : ""
      } ${className}`}
      onClick={click}
    >
      <Badge
        badgeContent={
          desktopMatches || !badgeContent
            ? 0
            : englishNumberToPersianNumber(+badgeContent)
        }
        style={{ color: "red" }}
      >
        <div
          className={`img-box ${
            badgeContent ? "img-box-active" : ""
          } px-2 d-flex align-items-center justify-content-center`}
        >
          {/*TODO: Style condition for adding scale should be removed*/}
          <Image width={36} height={36} src={img} alt="order" />
        </div>
      </Badge>

      <span
        className="mr-2  d-none d-xl-block"
        style={{ fontSize: desktopMatches ? 16 : 14 }}
      >
        {title}
      </span>
    </div>
  );
};
export default NotificationCard;
