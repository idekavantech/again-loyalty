import SefareshModal from "../Modal";
import { makeStyles } from "@material-ui/core/styles";
import { delete_label } from "../../context/actions";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useCallback } from "react";
import { useRouter } from "next/router";

const useStyles = makeStyles(() => ({
  bodyText: {
    fontSize: 18,
    padding: 20,
    margin: 10,
  },
}));

export default function RemoveMenu({ isOpen, onClose, slug, id }) {
  const classes = useStyles();
  const router = useRouter();
  const posId = router.query?.deviceId;
  const bodys = useCallback(() => {
    () => {
      return (
        <>
          <p className={classes.bodyText}>
            آیا از حذف منو مطمئا هستید؟ بعد از حذف شما دیگر قادر به مشاهده منو
            در نرم افزار درآمد نمی باشید
          </p>
        </>
      );
    };
  }, [classes]);

  const dispatch = useDispatch();
  const loadingSmall = useSelector((state) => state.superMenu.loadingSmall);

  return (
    <SefareshModal
      isOpen={isOpen}
      title="حذف منو"
      bodys={bodys}
      bottomStartText="لغو"
      bottomEndText={
        loadingSmall ? (
          <CircularProgress size={25} style={{ color: "white" }} />
        ) : (
          "حذف منو"
        )
      }
      bottomStartColor="#ff0017"
      bottomEndVariant="outlined"
      bottomEndOnClick={onClose}
      bottomStartOnClick={() => dispatch(delete_label(id, slug, posId))}
      onClose={onClose}
    />
  );
}
