import { useState } from "react";
import { Link } from "react-router-dom";
import Item from "./Item";
import LazyList from "./LazyList";

function DynamicList() {
  const initialList = Array(1_000)
    .fill()
    .map((each, index) => `${index}`);
  const [filteredList, setfilteredList] = useState(initialList);

  const handleChange = (event) => {
    const value = event.target.value;
    const filtered = initialList.filter((each) => each.includes(value));
    const valueToSet = value ? filtered : initialList;
    setfilteredList(valueToSet);
  };

  return (
    <div className="row">
      <div className="col-4 mt-5 mx-auto">
        <Link to="/" className="mb-3 d-block">
          Goto concurrent list
        </Link>

        <input
          type="number"
          placeholder="Type to filter"
          onChange={handleChange}
          className="form-control"
        />

        <div className="list-group mb-5 rounded border mt-4">
          <LazyList data={filteredList} height={300}>
            {({ data }) => {
              return (
                <>
                  {data.map((each) => (
                    <Item label={each} key={each} />
                  ))}
                </>
              );
            }}
          </LazyList>
        </div>

        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          delectus recusandae praesentium deleniti! Nobis assumenda delectus,
          rem facilis beatae similique corrupti consectetur numquam incidunt
          asperiores esse exercitationem quo tempora accusantium facere minus
          dicta ab officiis. Architecto quas non alias quod. Error sequi
          reiciendis beatae adipisci consectetur pariatur delectus dicta ut quod
          obcaecati, aliquam ullam asperiores minus nostrum vel et dolores odit
          molestias porro odio expedita sint debitis deleniti dolor! Quisquam
          modi corporis necessitatibus blanditiis molestiae natus dolorem sunt
          quam et minima voluptatum, accusamus est cum accusantium veniam quo
          consequuntur! Veniam ab consequuntur, dolor ipsa tempora, ratione
          dignissimos, numquam aut nesciunt quas debitis. Laudantium labore ipsa
          illum aspernatur nulla amet corporis quaerat iure. Cupiditate, quae
          voluptatibus? Autem tenetur dolorem beatae in rem, molestiae dicta,
          sapiente voluptate consectetur unde deserunt suscipit impedit
          obcaecati perferendis cum quod commodi porro eos labore? Rem
          aspernatur ut alias. Suscipit dolore repudiandae molestias? Nesciunt
          ex sit blanditiis quia nam accusamus ratione, ipsum est adipisci
          deserunt, voluptatem voluptas dolorem natus saepe eveniet minus quos
          sint harum illo, ab pariatur nemo. Laboriosam maiores libero obcaecati
          amet placeat error qui ipsam iusto molestiae sequi vitae perspiciatis
          minus eius eligendi culpa similique commodi quis, perferendis id
          mollitia accusamus veniam! Debitis, harum. Debitis, explicabo
          aspernatur? Dolores, sed impedit labore aliquam, vitae tempora,
          doloremque quae exercitationem voluptas deleniti commodi accusantium
          modi! Fugit ullam magnam debitis aliquam dolores eveniet, delectus
          quas hic adipisci in nesciunt vero consequuntur asperiores omnis nihil
          officia, quisquam quod cupiditate minus labore enim! Necessitatibus
          nostrum minus ratione aut animi similique, facilis sunt natus sint
          harum ipsa id ex accusantium aperiam neque ea dolores tempora rerum!
          Nulla accusamus voluptate amet at ipsum minus quis voluptates non
          voluptatem sit rerum, debitis corporis iusto sapiente soluta, dicta
          doloribus, laboriosam a placeat et. Dignissimos accusamus et
          aspernatur explicabo, ut saepe veritatis consequuntur obcaecati
          dolore.
        </div>
      </div>
    </div>
  );
}

export default DynamicList;
