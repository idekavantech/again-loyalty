import FeedbackPageContainer from "containers/Pages/Feedback";

export default function FeedbackPage() {
  return <FeedbackPageContainer />;
}

FeedbackPage.layoutConfig = {
  noHeader: true,
  noFooter: true,
  noCopyRightFooter: true,
};
