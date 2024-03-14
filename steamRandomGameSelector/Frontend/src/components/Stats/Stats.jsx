import "./Stats.css";
import { openNewWindow } from "../../utils/utils";

export const Stats = ({ steamid, playtime, achievments, rollcount, appid }) => {
  // Hours Played
  const parseTime = (time) => {
    return Number(time / 60).toFixed(1);
  };

  // const total = achievments ? achievments.length : 0;
  // const unlocked = achievments
  //   ? achievments.filter((item) => item.achieved == 1).length
  //   : 0;

  return (
    <div className="box-container stats-content">
      <h2>Game Stats</h2>

      {rollcount === 3 ? (
        " "
      ) : (
        <div className={"stats-content"}>
          <table className="stats-table">
            <tr>
              <th>Total Gametime</th>
              <td>{parseTime(playtime)} Hours</td>
            </tr>
            {/* <tr>
              <th>Achievments Unlocked</th>
              <td>{`${unlocked} / ${total}`}</td>
            </tr> */}
            <tr>
              <th>Debug</th>
              <td>{appid}</td>
            </tr>
            <tr>
              <th>Debug</th>
              <td>{steamid}</td>
            </tr>
          </table>

          <button
            onClick={() =>
              openNewWindow(`https://store.steampowered.com/app/${appid}/`)
            }
          >
            Visit Storepage
          </button>
        </div>
      )}
    </div>
  );
};
