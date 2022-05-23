import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function StockList() {
  const [stocks, setstocks] = useState([]);

  useEffect(() => {
    fetch("/stocks")
      .then((r) => r.json())
      .then(setstocks);
  }, []);

  return (
    <Wrapper>
        <Button>Add New Security</Button>
      {stocks.length > 0 ? (
        stocks.map((stock) => (
          <Stock key={stock.id}>
            <Box>
              <h2>{stock.symbol}: {stock.name}</h2>
              <p>
                <em>{stock.description}</em>
              </p>
              <p>
              <Button as={Link} t>Show Price Data</Button>
              </p>
              {/* <ReactMarkdown>{recipe.instructions}</ReactMarkdown> */}
            </Box>
          </Stock>
        ))
      ) : (
        <>
          <h2>No Assets Found</h2>
          <Button as={Link} to="/new">
            Add Security
          </Button>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Stock = styled.article`
  margin-bottom: 24px;
`;

export default StockList;