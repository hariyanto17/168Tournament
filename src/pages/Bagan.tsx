import React, { useState } from "react";
import { Footer, FullBagan, Header } from "../Components";
import data from "../data.json";

const leftSemiFinal1 = data.children[0].children[0];
const leftSemiFinal2 = data.children[0].children[1];

const rightSemiFinal1 = data.children[1].children[0];
const rightSemiFinal2 = data.children[1].children[1];

const Bagan = () => {
  const [actice, setActice] = useState("full-bagan");

  const renderBagan = (active) => {
    switch (active) {
      case "full-bagan":
        return <FullBagan data={data} />;
      case "bagan_A":
        return <FullBagan data={leftSemiFinal1} />;
      case "bagan_B":
        return <FullBagan data={leftSemiFinal2} />;
      case "bagan_C":
        return <FullBagan data={rightSemiFinal1} />;
      case "bagan_D":
        return <FullBagan data={rightSemiFinal2} />;
      default:
        return <FullBagan data={data} />;
    }
  };

  return (
    <div className="bg-gray-900 text-gray-200 font-inter">
      <Header />
      <div className="flex justify-center items-center h-16 bg-gray-800 gap-5">
        <p
          className={`${
            actice === "full-bagan" ? "text-yellow-600" : "text-gray-400"
          } cursor-pointer text-sm`}
          onClick={() => setActice("full-bagan")}
        >
          Full Bagan
        </p>
        <p
          className={`${
            actice === "bagan_A" ? "text-yellow-600" : "text-gray-400"
          } cursor-pointer text-sm`}
          onClick={() => setActice("bagan_A")}
        >
          Group A
        </p>
        <p
          className={`${
            actice === "bagan_B" ? "text-yellow-600" : "text-gray-400"
          } cursor-pointer text-sm`}
          onClick={() => setActice("bagan_B")}
        >
          Group B
        </p>
        <p
          className={`${
            actice === "bagan_C" ? "text-yellow-600" : "text-gray-400"
          } cursor-pointer text-sm`}
          onClick={() => setActice("bagan_C")}
        >
          Group C
        </p>
        <p
          className={`${
            actice === "bagan_D" ? "text-yellow-600" : "text-gray-400"
          } cursor-pointer text-sm`}
          onClick={() => setActice("bagan_D")}
        >
          Group D
        </p>
      </div>
      {renderBagan(actice)}
      <Footer />
    </div>
  );
};

export default Bagan;
