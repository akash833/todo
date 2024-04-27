import { TodoItem } from "./Components/Todo";
import "./list.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
export type ListType = {
  item: TodoItem;
  handleDelete: any;
  handleUpdate: any;
};

const List = ({ item, handleDelete, handleUpdate }: ListType) => {
  return (
    <div key={item.id} className="listWrapper">
      <div>
        <div className="title">{item.title}</div>
        <div className="desc">{item.description}</div>
      </div>
      <div className="icons">
        <FavoriteBorderIcon fontSize="large" style={{ cursor: "pointer" }} />
        <EditIcon
          fontSize="large"
          style={{ cursor: "pointer" }}
          onClick={handleUpdate}
        />
        <DeleteForeverIcon
          fontSize="large"
          style={{ cursor: "pointer" }}
          onClick={handleDelete}
        />
        <CheckCircleOutlineIcon
          fontSize="large"
          style={{ cursor: "pointer" }}
        />
      </div>
    </div>
  );
};

export default List;
