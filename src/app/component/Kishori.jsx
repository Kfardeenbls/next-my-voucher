const Kishori = ({ count, Set_count, input }) => {
  const kishori = count * 16;
  const Kishori_price = kishori * 7;
  return (
    <div>
      {input === 0 ? (
        <span>:{`${count} X 16 = ${kishori} X 7 =  ${Kishori_price} `}</span>
      ) : (
        <input
          type="number"
          className="input"
          placeholder="Total Kishori"
          value={count}
          onChange={(e) => Set_count(e.target.value)}
        />
      )}
    </div>
  );
};

export default Kishori;
