import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function PortfolioList({ user }) {
  const [portfolios, setPortfolios] = useState([]);

  useEffect(() => {
    fetch("/portfolios")
      .then((r) => r.json())
      .then(setPortfolios);
  }, []);

  return (
    <Wrapper>
      {portfolios.length > 0 ? (
        portfolios.filter(portfolio => portfolio.user.username === user.username || portfolio.client.username === user.username).map((portfolio) => (
          <PortfolioBlock1 key={portfolio.id}>
            <Box>
              <h2><Link to = {`/portfolios/${portfolio.id}`}>{portfolio.name}</Link></h2>
              <p>
                <em>Advisor: {portfolio.user.username}</em>
                &nbsp;·&nbsp;
                <cite>Client: {portfolio.client.username}</cite>
              </p>
            </Box>
          </PortfolioBlock1>
        ))
      ) : (
        <>
          <h2>No Portfolios Found</h2>
          <Button as={Link} to="/portfolios/new">
            Create a New Portfolio
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

const PortfolioBlock1 = styled.article`
  margin-bottom: 24px;
`;

export default PortfolioList;
