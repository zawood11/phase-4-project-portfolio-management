import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import PositionCard from "./PositionCard";

function PortfolioCard2() {
  const [portfolio, setPortfolio] = useState({})
  const {id} = useParams();

  useEffect(() => {   
        fetch(`/portfolios/${id}`)
        .then(res => res.json())
        .then(pf => setPortfolio(pf))
    }, []);

  
    if (!portfolio.client || !portfolio.user) return <h1>Loading...</h1>

  return (
    <Wrapper>
          <PortfolioBlock2>
          <Box>
              <h2><Link to = {`/portfolios/${portfolio.id}`}>{portfolio.name}</Link></h2>
              <p>
                <em>Advisor: {portfolio.user.username}</em>
                &nbsp;·&nbsp;
                <em>Client: {portfolio.client.username}</em>
              </p>
              <h3>Positions</h3>
              {portfolio.positions.map(position => (
                  <PositionBox>
                      <Box>
                          <h4>
                              <Button as={Link} to={`/stocks/${position.stock.id}`}>{position.stock.symbol}: {position.stock.name}</Button>
                              &nbsp;·&nbsp;
                              Position Value: ${Math.floor(position.stock.prices[0].close * position.quantity).toLocaleString("en-US")}
                              </h4>
                          <p>
                            Shares: {position.quantity}
                            &nbsp;·&nbsp;
                            Latest Price: ${position.stock.prices[0].close}
                            &nbsp;·&nbsp;
                            <em>{position.stock.prices[0].date}</em>
                          </p>
                      </Box>
                  </PositionBox>
              ))}
            </Box>
          </PortfolioBlock2>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const PortfolioBlock2 = styled.article`
  margin-bottom: 24px;
`;

const PositionBox = styled.article`
  margin-bottom: 24px;
`;

export default PortfolioCard2;