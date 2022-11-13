
const Item = ({label}) => {
  return <div id={label} className={`list-group-item`}>{label}</div>;
};

export default Item;
