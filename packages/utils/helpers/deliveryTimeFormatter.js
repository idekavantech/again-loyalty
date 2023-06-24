import moment from "moment";

export const deliveryTimeFormatter = (deliveryTime) => moment(deliveryTime * 1000).format("DD MMMM YYYY");

