import { TodoItem } from "./App";

export type ListType = {
  item: TodoItem;
  handleDelete: any;
  handleUpdate: any;
};

const List = ({ item, handleDelete, handleUpdate }: ListType) => {
  return (
    <div key={item.id} style={{ display: "flex" }}>
      <div className="title">{item.title}</div>
      <div className="desc">{item.description}</div>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default List;