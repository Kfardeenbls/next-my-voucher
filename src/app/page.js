"use client";
import { useState } from "react";
import "./page.css";
import Image from "next/image";
import logo from "../../public/logo.png";
import MonthYearDropdown from "./component/Date_Component";
import Kishori from "./component/Kishori";

const Voucher = () => {
  const data = [
    { title: "Dal", amount: 80 },
    { title: "Soya Chunk", amount: 75 },
    { title: "Egg", amount: 5.5 },
    { title: "Oil", amount: 100 },
    { title: "Condiments", amount: 0.32 },
    { title: "Fuel", amount: 0 },
    { title: "Others/lemon", amount: 0.1 },
    { title: "Vegetable", amount: 30 },
    { title: "Total Cost", amount: 5.96 },
    { title: "Morning Snacks", amount: 1.24 },
    { title: "Grand Total", amount: 5.5 },
  ];

  const [formData, setFormData] = useState({
    totalDalDays: "",
    totalSoyaDays: "",
    totalPreSchoolChildren: "",
    totalChildren: "",
    totalPW: "",
    totalLW: "",
    totalKishori: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    console.log(formData);
  };

  const totalDalDays = parseInt(formData.totalDalDays || 0, 10);
  const totalSoyaDays = parseInt(formData.totalSoyaDays || 0, 10);
  const totalPreSchoolChildren = parseInt(
    formData.totalPreSchoolChildren || 0,
    10
  );

  const totalChildren = parseInt(formData.totalChildren || 0, 10);
  const totalPW = parseInt(formData.totalPW || 0, 10);
  const totalLW = parseInt(formData.totalLW || 0, 10);
  const [selectedDate, setSelectedDate] = useState({ month: "", year: "" });

  const handleDateChange = (value) => {
    setSelectedDate(value);
    console.log("Selected Date in Parent:", value);
  };

  const totalEgg =
    totalPreSchoolChildren -
    (parseInt(totalDalDays, 10) + parseInt(totalSoyaDays, 10));
  const grandTotalEgg =
    (parseInt(totalLW, 10) +
      parseInt(totalPW, 10) +
      parseInt(totalChildren, 10)) *
    12;

  console.log("totalDalDays", totalDalDays);
  console.log("totalSoyaDays", totalSoyaDays);
  console.log("totalEgg", totalEgg);
  console.log("totalPreSchoolChildren", totalPreSchoolChildren);

  function calculateFoodQnt(index) {
    switch (index) {
      case 0:
        return totalDalDays * 0.03;
      case 1:
        return totalSoyaDays * 0.028;
      case 2:
        return totalEgg;
      case 3:
        return totalPreSchoolChildren * 0.003;
      case 4:
        return totalPreSchoolChildren;
      case 5:
        return 0;
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

  // STEP 1: Calculate total cost from case 8
  const totalCostValue = totalPreSchoolChildren * data[8].amount; // case 8

  // STEP 2: Define calculateFoodCost (but delay case 7 for now)
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
        return 0;
      case 6:
        return totalPreSchoolChildren * data[6].amount;
      case 7:
        return vegCost; // Will define after summing cases 0–6
      case 8:
        return totalCostValue;
      case 9:
        return totalPreSchoolChildren * data[9].amount;
      case 10:
        return grandTotalEgg * data[10].amount;
      default:
        return "";
    }
  }

  // STEP 3: Calculate sum of cases 0 to 6
  let sumUntil6 = 0;
  for (let i = 0; i <= 6; i++) {
    sumUntil6 += Number(calculateFoodCost(i));
  }

  // STEP 4: Now calculate vegCost (case 7)
  const vegCost = totalCostValue - sumUntil6;

  // STEP 5: Final return values including case 7
  const returnValues = [];
  for (let i = 0; i <= 10; i++) {
    returnValues.push(Number(calculateFoodCost(i)).toFixed(2));
  }

  // STEP 6: Extra totals if needed
  const snacksValue = totalPreSchoolChildren * data[9].amount;
  const grandTotal = grandTotalEgg * data[10].amount;
  const totalAmount = totalCostValue + snacksValue + grandTotal;
  const newtotalAmount =
    totalCostValue +
    snacksValue +
    grandTotal +
    (totalEgg * 1.5 + grandTotalEgg * 1.5);

  return (
    <div className="voucher">
      <div className="header">
        <Image src={logo} alt="" height={90} width={100} />
        {/* <h3 className="main-title txt-center">
          Wellcome to <h2>My Voucher</h2>
        </h3> */}
      </div>
      <>
        <MonthYearDropdown onChange={handleDateChange} />
      </>
      <div className="top-section">
        <div className="input-item flex-col-gap">
          <span className="placeholder">Total children in dal Days</span>
          <input
            type="number"
            className="input"
            name="totalDalDays"
            value={formData.totalDalDays}
            onChange={handleChange}
          />
        </div>

        <div className="input-item flex-col-gap">
          <span className="placeholder">Total Children in Soya Days</span>
          <input
            type="number"
            className="input"
            name="totalSoyaDays"
            value={formData.totalSoyaDays}
            onChange={handleChange}
          />
        </div>

        <div className="input-item flex-col-gap">
          <span className="placeholder">Total pre-school children present</span>
          <input
            type="number"
            className="input"
            name="totalPreSchoolChildren"
            value={formData.totalPreSchoolChildren}
            onChange={handleChange}
          />
        </div>

        <div className="input-item flex-col-gap">
          <span className="placeholder">Total children (6 months - 3 yrs)</span>
          <input
            type="number"
            className="input"
            name="totalChildren"
            value={formData.totalChildren}
            onChange={handleChange}
          />
        </div>

        <div className="input-item flex-col-gap">
          <span className="placeholder">Total PW</span>
          <input
            type="number"
            className="input"
            name="totalPW"
            value={formData.totalPW}
            onChange={handleChange}
          />
        </div>

        <div className="input-item flex-col-gap">
          <span className="placeholder">Total LW</span>
          <input
            type="number"
            className="input"
            name="totalLW"
            value={formData.totalLW}
            onChange={handleChange}
          />
        </div>

        <div className="input-item flex-col-gap">
          <span className="placeholder">Kishori</span>
          <Kishori
            count={formData.totalKishori}
            Set_count={(val) =>
              setFormData((prev) => ({ ...prev, totalKishori: val }))
            }
            input={1}
          />
        </div>
      </div>

      <p style={{ margin: "0 auto" }}>
        {selectedDate.month} {selectedDate.year}
      </p>
      <div className="wrapper">
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
          <div className="item total-quantity-supplied">
            <h4 className="title">Total quantity supplied during the month</h4>
            {data &&
              data.map((_, index) => {
                return (
                  <div className="voucher-column" key={index}>
                    {totalDalDays
                      ? index !== 10 &&
                        Number(calculateFoodQnt(index)).toFixed(3)
                      : "__"}
                    {totalLW &&
                      totalPW &&
                      index === 10 &&
                      `(${totalLW} + ${totalPW} + ${totalChildren}) * 12 = ${grandTotalEgg}`}
                  </div>
                );
              })}
          </div>
          <div className="item rate-per-kg">
            <h4 className="title">Rate/Kg</h4>
            {data &&
              data.map((item, index) => (
                <div className="voucher-column" key={index}>
                  {item.amount}
                </div>
              ))}
          </div>
          <div className="item total-Cost">
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
      </div>
      <div>
        <div className="mid-section">
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>Hot Cook</span>
              <span>Snacks </span>
              <span>Grand Total </span>
              <br />
              <span>Total </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span>:{totalCostValue}</span>
              <span>:{snacksValue}</span>
              <span>:{grandTotal ? grandTotal : 0}</span>
              <br />
              <span>:{totalAmount ? totalAmount : 0}</span>
            </div>
          </div>

          <div
            className="line"
            style={{ width: "100%", height: "2px", background: "black" }}
          ></div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            marginTop: "1.5rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>Kishori</span>
            <span>Fuel </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/* {"Kishori "} */}
            <Kishori
              count={formData.totalKishori}
              Set_count={(val) =>
                setFormData((prev) => ({ ...prev, totalKishori: val }))
              }
              input={0}
            />
            <span>
              {`${formData.totalPreSchoolChildren || 0} × ₹0.50 = ₹${(
                parseInt(formData.totalPreSchoolChildren || 0, 10) * 0.5
              ).toFixed(2)}`}
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
            marginTop: "1.5rem",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>New Hot cooked </span>
            <span>New THR </span>
            <br />
            <span>New Total </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>:{`${totalEgg} x 1.5 = ${totalEgg * 1.5}`}</span>
            <span>:{`${grandTotalEgg} x 1.5 = ${grandTotalEgg * 1.5}`}</span>
            <br />
            <span>: {newtotalAmount ? newtotalAmount : 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Voucher;
