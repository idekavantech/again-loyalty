import { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import Divider from "@material-ui/core/Divider";
import CircularProgress from "@material-ui/core/CircularProgress";
import { get_sale_channels, create_sale_channels } from "./context/actions";
import AdminBreadCrumb from "../AdminBreadCrumb";
import { OTHER_SALES_CHANNEL, sales_channel_types } from "@saas/stores/plugins/constants";

const useStyles = makeStyles(() => ({
  button: {
    boxShadow: "none",
    width: "100%",
    padding: 7,
    borderRadius: 10,
    fontSize: 14,
    "&:hover": {
      boxShadow: "none",
    },
  },
  textFieldLike: {
    width: "100%",
    border: "1px solid grey",
    borderRadius: 5,
    padding: 10,
  },
}));

function AdminSaleChannel({ slug }) {
  const classes = useStyles();
  const saleChannels = useSelector((state) => state.saleChannel);
  const [channels, setChannels] = useState([]);
  const [chName, setChName] = useState("");
  const [serviceType, setServiceType] = useState(OTHER_SALES_CHANNEL);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(get_sale_channels(slug));
    }, 0);
  }, []);


  const create_channel = () => {
    setChName(null);
    setChannels([]);
    dispatch(
      create_sale_channels(slug, {
        name: chName,
        service_type: serviceType,
      })
    );
  };

  if (saleChannels.loading) {
    return <CircularProgress />;
  } else {
    return (
      <div className="container pb-3">
        <AdminBreadCrumb />
        <Paper elevation={2} className="my-4 p-4">
          <div className="col-12 px-0 mb-3">
            <div className="mb-2 u-fontLarge u-fontWeightHeavy">
              تعریف کانال فروش
            </div>
            <div className="mb-4">
              با ساخت کانال فروش, میتوانید برای دستگاه خود یک کانال فروش تایین
              کنید. همچنین میتوانید کانال فروش ایجاد شده را بر روی دستگاه خود
              فعال کنید
            </div>
            <Divider />
            <br />
            {Object.keys(saleChannels.channels).map((i) => (
              <div key={i.id} className="row m-4">
                <div className="col-sm-2">
                  <p style={{ marginTop: 10, marginRight: 40 }}>
                    نام کانال فروش
                  </p>
                </div>
                <div className="col-sm-3">
                  <TextField
                    value={saleChannels.channels[i]?.name}
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="col-sm-2">
                  <p style={{ marginTop: 10, marginRight: 40 }}>
                    نوع کانال فروش
                  </p>
                </div>
                <div className="col-sm-3">
                  <TextField
                    value={saleChannels.channels[i]?.data?.type}
                    style={{ width: "100%" }}
                  />
                </div>
                <div className="col-sm-2 mt-2">
                  {saleChannels.channels[i]?.status && (
                    <p
                      style={{
                        color: "green",
                        fontWeight: "bold",
                        fontSize: 15,
                        marginTop: 5,
                      }}
                    >
                      فعال
                    </p>
                  )}
                </div>
              </div>
            ))}
            {channels.map((channel) => (
              <div key={channel.id} className="row m-4">
                <div className="col-sm-2">
                  <p style={{ marginTop: 10, marginRight: 40 }}>
                    نام کانال فروش
                  </p>
                </div>
                <div className="col-sm-3">
                  <TextField
                    style={{ width: "100%" }}
                    value={chName}
                    onChange={(e) => setChName(e.target.value)}
                  />
                </div>
                <div className="col-sm-2">
                  <p style={{ marginTop: 10, marginRight: 40 }}>
                    نوع کانال فروش
                  </p>
                </div>
                <div className="col-sm-3">
                  <Select
                    style={{
                      border: "none",
                      height: 40,
                      minWidth: "100%",
                    }}
                    value={serviceType}
                    onChange={(e) => {
                      setServiceType(e.target.value);
                    }}
                    inputProps={{
                      style: { border: "none" },
                      outline: "none",
                    }}
                    displayEmpty
                  >
                    {sales_channel_types.map((st) => (
                      <MenuItem key={st.id} value={st}>{st}</MenuItem>
                    ))}
                  </Select>
                </div>
                <div className="col-sm-2">
                  <Button
                    variant={"outlined"}
                    color="primary"
                    className={classes.button}
                    onClick={create_channel}
                    style={{ width: "50%" }}
                  >
                    <SaveIcon />
                  </Button>
                  <Button
                    variant={"outlined"}
                    color="primary"
                    className={classes.button}
                    onClick={() => setChannels([])}
                    style={{ width: "50%" }}
                  >
                    <CancelIcon />
                  </Button>
                </div>
              </div>
            ))}
            <br />
            {!channels.length && (
              <Button
                variant={"outlined"}
                color="primary"
                className={classes.button}
                onClick={() => {
                  setChannels([...channels, 1]);
                }}
              >
                ساخت کانال فروش جدید
              </Button>
            )}
          </div>
        </Paper>
      </div>
    );
  }
}

export default AdminSaleChannel;
