import "./App.css";
import { useState, useTransition } from "react";
import { Link } from "react-router-dom";

function App() {
  const initialList = Array(1_000).fill().map((each, index) => `${index}`);
  const [filteredList, setfilteredList] = useState(initialList);
  const [isPending, startTransition] = useTransition();

  const handleChange = (event) => {
    const value = event.target.value;
    const filtered = initialList.filter((each) => each.includes(value));
    const valueToSet = value ? filtered : initialList;
    startTransition(() => setfilteredList(valueToSet));
  };

  return (
    <div className="row">
      <div className="col-4 mt-5 mx-auto">
        <Link to="/dynamic" className="mb-3 d-block">Goto dynamic routes</Link>
        <input type="number" placeholder="Type to filter" onChange={handleChange} className="form-control" />
        <div className="rounded border mt-4 list-container">
          <div className="list-group">
            {isPending
              ? (
                <div className="p-3">
                  Calculating...
                </div>
              )
              : filteredList.map((each) => {
                return (
                  <div key={each} className="list-group-item">
                    {each}
                  </div>
                )})}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
