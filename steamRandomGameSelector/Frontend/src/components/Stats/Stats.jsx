import "./Stats.css";

export const Stats = (props) => {
  // Hours Played
  const parseTime = (time) => {
    return Number(time / 60).toFixed(1);
  };

  return (
    <div className="box-container stats-content">
      <h2>Game Stats</h2>

      <table className="stats-table">
        <tr>
          <th>Total Gametime</th>
          <td>{parseTime(props.playtime)} Hours</td>
        </tr>
        <tr>
          <th>Achievments Unlocked</th>
          <td>3</td>
        </tr>
        <tr>
          <th>Go to Steam Page</th>
          <td>M</td>
        </tr>
      </table>
    </div>
  );
};
