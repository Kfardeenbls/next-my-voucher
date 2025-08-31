const Separate_Egg_cost = ({ Kishori_count, HC_Count, THR_Count }) => {
  const kishori = Number(Kishori_count) * 16;
  const Kishori_price = Number(kishori * 7).toFixed(2);

  const HC_price = Number(HC_Count * 2).toFixed(2);
  const THR_price = Number(THR_Count * 1.5).toFixed(2);

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <div
        className="item_name"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <span>MSPY</span>
        <span>H.C</span>
        <span>THR</span>
      </div>
      <div
        className="item_value"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <span>
          : {`${Kishori_count} × 16 = ${kishori} × 7 = ${Kishori_price}`}
        </span>
        <span>: {`${HC_Count} × 2 = ${HC_price}`}</span>
        <span>: {`${THR_Count} × 1.5 = ${THR_price}`}</span>
      </div>
    </div>
  );
};

export default Separate_Egg_cost;
