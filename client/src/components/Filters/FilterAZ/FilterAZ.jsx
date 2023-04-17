import { useSelector, useDispatch } from "react-redux";
import filter from "./filter";
import { Link } from "react-router-dom";
import { filters } from "../../../redux/action/action";
//icons
import { faSortAlphaUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FilterAZ = ({games,setgames}) => {
  const state = useSelector((state) => state.videogames);
  const dispatch = useDispatch();

  const handleButtonClick = (event) => {

    event.preventDefault();
    // setgames(filter(games));
    dispatch(filters(filter(games)));
  };

  return (
    <div>
      <Link onClick={handleButtonClick} >
        <FontAwesomeIcon
          icon={faSortAlphaUp}
          style={{ color: "white" }}
          />
          Alphabetical
      </Link>
    </div>
  );
};

export default FilterAZ;
