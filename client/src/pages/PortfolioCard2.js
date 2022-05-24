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

export default PortfolioCard2;