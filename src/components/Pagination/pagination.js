import Pagination from "react-bootstrap/Pagination";

const Pages = (props) => {

	const { onChange, active, pages, maxButtons } = props;
  let items = [];

  const startIndex = active - 1 || 1;
  const endIndex = Math.min(pages, maxButtons + startIndex - 1);

  for (let number = startIndex; number <= endIndex; number++) {
    items.push(
      <Pagination.Item onClick={() => onChange(number)} key={number} active={number === active}>
        {number}
      </Pagination.Item>
    );
  }

  return (
	 
    <div className="myPag">
		  <hr/>

      <Pagination className="myPag2">{items}</Pagination>
    </div>
  );
};

export default Pages;