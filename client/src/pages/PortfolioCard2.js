import { useEffect, useImperativeHandle, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";
import PositionCard from "./PositionCard";

function PortfolioCard2() {
  const [portfolio, setPortfolio] = useState({})
  const {id} = useParams();

  const [errors, setErrors] = useState([]);
  const history = useHistory();

  useEffect(() => {   
        fetch(`/portfolios/${id}`)
        .then(res => res.json())
        .then(pf => setPortfolio(pf))
    }, []);

  
    if (!portfolio.client || !portfolio.user) return <h1>Loading...</h1>
  
  const deletePortfolio = () => {
    fetch(`/portfolios/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        history.push("/");
      } else {
        r.json().then((err) => setErrors(err.errors))
      }
    });
  }
  
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
              <Button as={Link} to="/positions/new">Add Position</Button>
              <h3>Positions</h3>
              {portfolio.positions.length > 0 ? (portfolio.positions.map(position => (
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
                            <em>Updated: {position.stock.prices[0].date}</em>
                          </p>
                      </Box>
                  </PositionBox>
              ))) : (
                  <>
                  <h2>No Positions Found</h2>
                  </>
              )}
            </Box>
            <p></p>
            <Button onClick={deletePortfolio} >Delete Portfolio</Button>
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