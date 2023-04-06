import Paper from "@material-ui/core/Paper";
import LazyImage from "@saas/components/LazyImage";
import LoadingSVGs from "configs/loadingSVGs";

const HeaderAdminBusinessOwner = () => {
  const LOGO = LoadingSVGs[process.env.NEXT_PUBLIC_APP_NAME];

  return (
    <Paper elevation={1} className="w-100 p-4">
      <div className="p-4 d-flex flex-col align-items-center">
        {LOGO ? <LOGO style={{ height: 26 }} /> : null}
        <p
          className="mt-4"
          style={{ fontSize: 22, fontWeight: 700, lineHeight: "44px" }}
        >
          To{process.env.NEXT_PUBLIC_APP_NAME_PERSIAN} welcome
        </p>
        <p className="mt-4 text-center" style={{ lineHeight: "26px" }}>
          Thank you for«{process.env.NEXT_PUBLIC_APP_NAME_PERSIAN}» the trust
          you did. Please first form the form below with the owner's profile before logging in to the Management Panel
          Fill the site.
          {process.env.NEXT_PUBLIC_APP_NAME_PERSIAN == "Showcase"
            ? ` By entering this information, stages of online sales
          You get easier like domain registration, payment gateway and Inm. (Video
          Tutorials in your panel.)`
            : null}
        </p>
        <LazyImage
          width={336}
          src="/images/b-info.svg"
          className="mt-4 px-5 px-md-0"
        />
      </div>
    </Paper>
  );
};

export default HeaderAdminBusinessOwner;
