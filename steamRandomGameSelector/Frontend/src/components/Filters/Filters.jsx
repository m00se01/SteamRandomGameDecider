import "./Filters.css";
import "./FilterModal.css";

export const Filters = () => {
  return (
    <div className="box-container filter-content">
      <h2>Filters:</h2>

      <form action="" className="form-container">
        {/* Checkboxes, Radio, Sliders ? */}

        <div className="radio-btns">
          <h2 className="filter-heading">Gametime</h2>

          <ul>
            <li>
              <label htmlFor="lt10"> Never Played </label>
              <input type="radio" name="playtime" id="lt10" />
            </li>
            <li>
              <label htmlFor="fewHours"> Less Than 15 hours Played </label>
              <input type="radio" name="playtime" id="fewHours" />
            </li>

            <li>
              <label htmlFor="oftenPlay"> More Than 15 hours Played </label>
              <input type="radio" name="playtime" id="oftenPlay" />
            </li>
          </ul>
        </div>

        <div className="genre-wrapper">
          <h2 className="filter-heading">Genre</h2>
          <label htmlFor="game-genre">Select Genre</label>
          {/* Dropdown menu */}
          <select name="game-genre" id="">
            <option value="rpg">RPG</option>
            <option value="action">Action</option>
            <option value="adventure">Adventure</option>
            <option value="Simulation">Simulation</option>
          </select>
        </div>
      </form>
      <button>Apply</button>
    </div>
  );
};
