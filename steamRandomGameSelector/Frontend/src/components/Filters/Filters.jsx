import "./Filters.css";

export const Filters = () => {
  return (
    <div className="box-container filters-content">
      <h2>Filters:</h2>

      <form action="">
        {/* Checkboxes, Radio, Sliders ? */}

        <div className="radio-btns">
          <ul>
            <li>
              <label htmlFor="lt10"> Never Played </label>
              <input type="radio" name="playtime" id="lt10" />
            </li>
            <li>
              <label htmlFor="fewHours"> Less Than 5 hours Played </label>
              <input type="radio" name="playtime" id="fewHours" />
            </li>

            <li>
              <label htmlFor="oftenPlay"> More Than 5 hours Played </label>
              <input type="radio" name="playtime" id="oftenPlay" />
            </li>
          </ul>
        </div>

        <input type="text"></input>
      </form>
    </div>
  );
};
