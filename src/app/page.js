"use client";
import React, { useState } from "react";
import "./page.css";
import Image from "next/image";
import logo from "../../public/logo.png";

const Voucher = () => {
  const data = [
    { title: "Dal", amount: 80 },
    { title: "Soya Chunk", amount: 75 },
    { title: "Egg", amount: 5.5 },
    { title: "Oil", amount: 100 },
    { title: "Condiments", amount: 0.32 },
    { title: "Fuel", amount: "__" },
    { title: "Others/lemon", amount: 0.1 },
    { title: "Vegetable", amount: 30 },
    { title: "Total Cost", amount: 5.96 },
    { title: "Morning Snacks", amount: 1.24 },
    { title: "Grand Total", amount: 5.5 },
  ];
  const [totalDalDays, setTotalDalDays] = useState(0);
  const [totalSoyaDays, setTotalSoyaDays] = useState(0);
  const [totalPreSchoolChildren, setTotalPreSchoolChildren] = useState(0);
  const [totalChildren, setTotalChildren] = useState(0);
  const [totalPW, setTotalPW] = useState(0);
  const [totalLW, setTotalLW] = useState(0);

  const totalEgg = parseInt(totalDalDays, 10) + parseInt(totalSoyaDays, 10);
  const grandTotalEgg =
    (parseInt(totalLW, 10) +
      parseInt(totalPW, 10) +
      parseInt(totalChildren, 10)) *
    12;

  function calculateFoodQnt(index) {
    switch (index) {
      case 0:
        return totalDalDays * 0.03;
      case 1:
        return totalSoyaDays * 0.028;
      case 2:
        return totalPreSchoolChildren - totalEgg;
      case 3:
        return totalPreSchoolChildren * 0.003;
      case 4:
        return totalPreSchoolChildren;
      case 5:
        return "___";
      case 6:
        return totalPreSchoolChildren;
      case 7:
        return vegCost / data[7].amount;
      case 8:
        return totalPreSchoolChildren;
      case 9:
        return totalPreSchoolChildren;
      case 10:
        return grandTotalEgg;
      default:
        return "";
    }
  }

  const returnValues = [];
  for (let i = 0; i <= 6; i++) {
    returnValues.push(Number(calculateFoodCost(i)).toFixed(2));
  }

  const sumWithoutIndex5 = returnValues.reduce((acc, val, index) => {
    if (index !== 5) {
      return acc + parseFloat(val);
    }
    return acc;
  }, 0);

  const totalCostValue = totalPreSchoolChildren * data[8].amount;
  // const totalCostWithoutFuel = totalCostValue - totalPreSchoolChildren * 0.5;
  const snacksValue = totalPreSchoolChildren * data[9].amount;
  const grandTotal = grandTotalEgg * data[10].amount;

  const totalAmount = totalCostValue + snacksValue + grandTotal;

  const vegCost = totalCostValue - sumWithoutIndex5;

  function calculateFoodCost(index) {
    switch (index) {
      case 0:
        return totalDalDays * 0.03 * data[0].amount;
      case 1:
        return totalSoyaDays * 0.028 * data[1].amount;
      case 2:
        return (totalPreSchoolChildren - totalEgg) * data[2].amount;
      case 3:
        return totalPreSchoolChildren * 0.003 * data[3].amount;
      case 4:
        return totalPreSchoolChildren * data[4].amount;
      case 5:
        return "__";
      case 6:
        return totalPreSchoolChildren * data[6].amount;
      case 7:
        return vegCost;
      case 8:
        return totalPreSchoolChildren * data[8].amount;
      case 9:
        return totalPreSchoolChildren * data[9].amount;
      case 10:
        return grandTotalEgg * data[10].amount;

      default:
        return "";
    }
  }

  return (
    <div className="voucher">
      <div className="header">
        <Image src={logo} alt="" height={90} width={100} />
        <h3 className="main-title txt-center">
          Wellcome to <h2>My Voucher</h2>
        </h3>
      </div>
      <div className="top-section">
        <div className="input-item flex-col-gap">
          <span className="placeholder">Total dal Days </span>
          <input
            type="number"
            className="input"
            value={totalDalDays}
            onChange={(e) => setTotalDalDays(e.target.value)}
          />
        </div>

        <div className="input-item flex-col-gap">
          <span className="placeholder">Total Soya Days </span>
          <input
            type="number"
            className="input"
            placeholder="Total Soya Days"
            value={totalSoyaDays}
            onChange={(e) => setTotalSoyaDays(e.target.value)}
          />
        </div>
        <div className="input-item flex-col-gap">
          <span className="placeholder">Total pre-school children </span>
          <input
            type="number"
            className="input"
            placeholder=""
            value={totalPreSchoolChildren}
            onChange={(e) => setTotalPreSchoolChildren(e.target.value)}
          />
        </div>
        <div className="input-item flex-col-gap">
          <span className="placeholder">
            Total children (6 months - 3 yrs){" "}
          </span>
          <input
            type="number"
            className="input"
            placeholder="Total children (6 months - 3 yrs)"
            value={totalChildren}
            onChange={(e) => setTotalChildren(e.target.value)}
          />
        </div>
        <div className="input-item flex-col-gap">
          <span className="placeholder">Total PW </span>
          <input
            type="number"
            className="input"
            placeholder=""
            value={totalPW}
            onChange={(e) => setTotalPW(e.target.value)}
          />
        </div>

        <div className="input-item flex-col-gap">
          <span className="placeholder">Total LW </span>
          <input
            type="number"
            className="input"
            placeholder=""
            value={totalLW}
            onChange={(e) => setTotalLW(e.target.value)}
          />
        </div>
      </div>
      <div className=" bottom-secttion">
        <div className="item">
          <h4 className="title">Food Stuff</h4>
          {data &&
            data.map((item, index) => (
              <div className="voucher-column" key={index}>
                {item.title}
              </div>
            ))}
        </div>
        <div className="total-quantity-supplied">
          <h4 className="title">Total quantity supplied during the month</h4>
          {data &&
            data.map((_, index) => {
              return (
                <div className="voucher-column" key={index}>
                  {totalDalDays
                    ? index !== 10 && Number(calculateFoodQnt(index)).toFixed(3)
                    : ""}
                  {totalLW &&
                    totalPW &&
                    index === 10 &&
                    `(${totalLW} + ${totalPW} + ${totalChildren}) * 12 = ${grandTotalEgg}`}
                </div>
              );
            })}
        </div>
        <div className="rate-per-kg">
          <h4 className="title">Rate/Kg</h4>
          {data &&
            data.map((item, index) => (
              <div className="voucher-column" key={index}>
                {item.amount}
              </div>
            ))}
        </div>
        <div className="total-Cost">
          <h4 className="title">Total Cost of food stuff supplied</h4>
          {data &&
            data.map((_, index) => {
              return (
                <div className="voucher-column" key={index}>
                  {totalDalDays
                    ? Number(calculateFoodCost(index)).toFixed(2)
                    : "__"}
                </div>
              );
            })}
        </div>
      </div>
      <div className="mid-section">
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>Hot Cook</span>
            <span>Snacks </span>
            <span>Grand Total </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>:{totalCostValue}</span>
            <span>:{snacksValue}</span>
            <span>:{grandTotal}</span>
          </div>
        </div>

        <div
          className="line"
          style={{ width: "100%", height: "2px", background: "black" }}
        ></div>
        <div>
          <span>Total </span>
          <span>: {totalAmount}</span>
        </div>
      </div>
    </div>
  );
};

export default Voucher;
