import { englishNumberToPersianNumber } from "@saas/utils/helpers/englishNumberToPersianNumber";

const Progress = ({ percent }) => {
  return (
    <>
      <div
        className="donut"
        style={{
          background: `conic-gradient(#0050FF 0deg ${(360 * percent) / 100}deg,
    #EEEEEE ${(360 * percent) / 100}deg 360deg)`,
        }}
      >
        <div className="hole">{englishNumberToPersianNumber(percent)}%</div>
      </div>
    </>
  );
};

export default Progress;
