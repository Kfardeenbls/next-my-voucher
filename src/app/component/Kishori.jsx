const Kishori = ({ count, Set_count }) => {
  return (
    <div>
      <input
        type="number"
        className="input"
        placeholder="Total Kishori"
        value={count}
        onChange={(e) => Set_count(e.target.value)}
      />
    </div>
  );
};

export default Kishori;
