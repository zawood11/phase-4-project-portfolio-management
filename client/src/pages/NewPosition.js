import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { Button, Error, FormField, Input, Label, Select } from "../styles";

function NewPosition({ user }) {
  const [stocks, setStocks] = useState([]);
  const [stockId, setStockId] = useState("");
  const [portfolios, setPortfolios] = useState("");
  const [portfolioId, setPortfolioId] = useState("");
  const [quantity, setQuantity] = useState("");

  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  
  useEffect(() => {
    fetch(`/stocks`)
    .then((r) => r.json())
    .then(setStocks)
    .then(fetch(`/portfolios`)
    .then((r) => r.json())
    .then(setPortfolios))
}, []);
  
if (!stocks || !portfolios) return <h1>Loading...</h1>

function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/positions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stock_id: stockId,
        portfolio_id: portfolioId,
        quantity: quantity,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        history.push("/");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <Wrapper>
      <WrapperChild>
        <h2>Add Position to a Portfolio</h2>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="stockId">Stock Symbol</Label>
            <Select
              type="text"
              defaultValue={"default"}
              onChange={(e) => setStockId(e.target.value)}
              id="stockId">
                  <option value={"default"} disabled>Select a Stock</option>
                  {stocks.map((stock, index) => <option key={index} value={stock.id}>{stock.symbol}</option>)}
            </Select>
          </FormField>
          <FormField>
            <Label htmlFor="portfolioId">Portfolio</Label>
            <Select
              type="text"
              defaultValue={"default"}
              onChange={(e) => setPortfolioId(e.target.value)}
              id="portfolioId">
                  <option value={"default"} disabled>Select a Portfolio</option>
                  {portfolios.map((portfolio, index) => <option key={index} value={portfolio.id}>{portfolio.name}</option>)}
            </Select>
          </FormField>
          <FormField>
            <Label htmlFor="quantity">Number of Shares</Label>
            <Input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </FormField>
          <FormField>
            <Button color="primary" type="submit">
              {isLoading ? "Loading..." : "Add Position"}
            </Button>
          </FormField>
          <FormField>
            {errors.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
          </FormField>
        </form>
      </WrapperChild>
      <WrapperChild>
        <h1>{stocks.symbol}</h1>
        <p><cite>Added by: {user.username}</cite></p>
      </WrapperChild>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 40px auto;
  padding: 16px;
  display: flex;
  gap: 24px;
`;

const WrapperChild = styled.div`
  flex: 1;
`;

export default NewPosition;