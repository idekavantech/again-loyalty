import MeetingContainer from "containers/Meeting";
import Head from "next/head";
export default function MeetingPage() {
  return (
    <div>
      <Head>
        <title>درخواست جلسه</title>
      </Head>
      <MeetingContainer />
    </div>
  );
}
MeetingPage.NeedAuth = true;
