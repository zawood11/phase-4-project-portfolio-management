import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { Box, Button } from "../styles";
import StockCard from "./StockCard";

function StockList() {
  const [stocks, setStocks] = useState([]);
  
  useEffect(() => {
        fetch(`/stocks`)
        .then((r) => r.json())
        .then(setStocks)
  }, []);

  return (
    <Wrapper>
        <Button as={Link} to="/stocks/new">Add New Security</Button>
        {stocks.length > 0 ? (
            stocks.map((stock) => (
            <Stock key={stock.id}>
              <Box>
                <h2><Link to = {`/stocks/${stock.id}`}>{stock.symbol}</Link>: {stock.name}</h2>
                <p>
                  <em>{stock.description}</em>
                </p>
              </Box>
            </Stock>
        ))
      ) : (
        <>
        <h2>No Assets Found</h2>
        <Button as={Link} to="/new">Add Security</Button>
        </>
      )
      }
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