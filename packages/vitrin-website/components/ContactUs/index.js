import "react-tiny-fab/dist/styles.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
const Fab = dynamic(() => import("react-tiny-fab").then((comp) => comp.Fab), {
  ssr: false,
});

const ContactUs = ({ click }) => {
  const [tiny, setTiny] = useState(false);

  useEffect(() => {
    setTiny(true);
  }, []);
  return (
    <>
      {tiny && (
        <Fab
          mainButtonStyles={{
            backgroundColor: "#0050FF",
            border: "1px solid white",
            width: 72,
            height: 72,
          }}
          onClick={click}
          icon={
            <Image
              width={40}
              height={40}
              src="/images/Calling 1.svg"
              alt="calling"
            />
          }
          text="مشاوره رایگان"
          style={{
            position: "fixed",
            bottom: -10,
            zIndex: 10,
            left: -10,
            right: "right",
          }}
        ></Fab>
      )}
    </>
  );
};

export default ContactUs;
