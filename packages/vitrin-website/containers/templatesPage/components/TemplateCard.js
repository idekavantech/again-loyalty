import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";

function TemplateCard({
  id,
  image,
  title,
  description,
  domain,
  tags,
  onSelect,
}) {
  return (
    <div className="col-12 col-md-6 col-lg-4 mb-3 pt-3 px-3">
      <div
        key={id}
        className="template-page-card-item d-flex flex-column justify-content-between"
      >
        <Link passHref href={`/cr~templates/${domain}`}>
          <div>
            {" "}
            {/* Multiple children were passed to <Link> */}
            <div className="template-page-card-header">
              <div />
              <div className="d-flex justify-content-center align-items-center">
                <div className="template-page-card-account d-flex align-items-center ml-2">
                  <Image
                    alt=""
                    src={"/images/template-card/user-account.svg"}
                    width={"8px"}
                    height={"8px"}
                    priority
                    unoptimized
                  />
                </div>
                <div className="template-page-card-searchbar">
                  <div />
                </div>
                <div className="template-page-card-actions d-flex align-items-center">
                  <Image
                    alt=""
                    src={"/images/template-card/close-big.svg"}
                    width={"8px"}
                    height={"8px"}
                    priority
                    unoptimized
                  />
                  <Image
                    alt=""
                    src={"/images/template-card/arrow-right.svg"}
                    width={"6px"}
                    height={"6px"}
                    priority
                    unoptimized
                  />
                  <Image
                    alt=""
                    src={"/images/template-card/arrow-left.svg"}
                    width={"6px"}
                    height={"6px"}
                    priority
                    unoptimized
                  />
                </div>
              </div>
            </div>
            <div className="image">
              <Image
                alt=""
                width={"100%"}
                height={288}
                src={image}
                priority
                unoptimized
              />
            </div>
            <div className="template-page-card-details px-4 pt-4">
              <div>
                <h3 className="mt-2 title">قالب {title}</h3>
                <p className="my-2 tags">{tags.join("، ")}</p>
                <p className="mt-3 description">{description}</p>
              </div>
            </div>
          </div>
        </Link>
        <div className="template-page-card-details px-4 pb-4">
          <div className="btns d-flex justify-content-between mt-4">
            <button className="flex-1" onClick={() => onSelect(domain)}>
              انتخاب قالب
            </button>

            <Link passHref href={`/cr~templates/${domain}`}>
              <button className="flex-1 mr-4">مشاهده قالب</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

TemplateCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  domain: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default TemplateCard;
