import { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function StockCard() {
  const [stock, setStock] = useState({})
  const [showPriceData, setShowPriceData] = useState(false);
  const {id} = useParams();
  const history = useHistory();

  useEffect(() => {
        fetch(`/stocks/${id}`)
        .then(res => res.json())
        .then(stock => setStock(stock))
    }, []);

  const togglePriceData = () => { 
    setShowPriceData(!showPriceData)
 }

 const loadPriceData = () => { 
    fetch(`/stocks/${id}/prices`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: ""
    })
    .then(() => history.go(0))
 }

 const PriceTable = () => {
    return(
    <table width="100%">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Open</th>
                    <th>High</th>
                    <th>Low</th>
                    <th>Close</th>
                    <th>Volume</th>
                </tr>
            </thead>
            <tbody>
                {stock.prices.sort((a,b) => b.date > a.date ? 1:-1).map(price => (
                    <tr key={price.id}>
                        <td>{price.date}</td>
                        <td>{price.open}</td>
                        <td>{price.high}</td>
                        <td>{price.low}</td>
                        <td>{price.close}</td>
                        <td>{price.volume}</td>
                    </tr>
                ))}
            </tbody>
        </table>)
}

  return (
    <Wrapper>
          <Stock key={stock.id}>
            <Box>
              <h2><Link to = {`/stocks/${stock.id}`}>{stock.symbol}</Link>: {stock.name}</h2>
              <p>
                <em>{stock.description}</em>
              </p>
              <p>
                <Button onClick={togglePriceData}>{showPriceData ? "Hide Price Data" : "Show Price Data"}</Button>
              </p>
                {showPriceData ? <PriceTable /> : null}
            </Box>
            <p></p>
            <Button onClick={loadPriceData}>Update Price Data</Button>
            &nbsp;·&nbsp;
            <em>via AlphaVantage API. Last 100 days price data available.</em>
          </Stock>
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

export default StockCard;