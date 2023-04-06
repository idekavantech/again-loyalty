import { jungleI, strawberryII } from "../colors";
export const paymentStates = {
  0: {
    label: "unpaid",
    progress: "0%",
    color: strawberryII,
    backgroundColor:
      "linear-gradient(0deg, rgba(255, 0, 56, 0.16), rgba(255, 0, 56, 0.16)), #FFFFFF",
  },
  1: {
    label: "incompleted",
    progress: "50%",
    color: "#FFAA00",
    backgroundColor:
      "linear-gradient(0deg, rgba(255, 170, 0, 0.12), rgba(255, 170, 0, 0.12)), #FFFFFF",
  },
  2: {
    label: "Paid",
    progress: "100%",
    color: jungleI,
    backgroundColor: "rgba(0, 200, 151, 0.12)",
  },
  4: {
    label: "Cancellation",
    progress: "0%",
    color: strawberryII,
    backgroundColor:
      "linear-gradient(0deg, rgba(255, 0, 56, 0.16), rgba(255, 0, 56, 0.16)), #FFFFFF",
  },
};
