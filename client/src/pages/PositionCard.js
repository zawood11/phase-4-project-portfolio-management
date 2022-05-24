import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { Box, Button } from "../styles";

function PositionCard({ position }) {

  return (
    <Wrapper>
          <Position>
          <Box>
              <h2>{position.id}</h2>

            </Box>
          </Position>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 800px;
  margin: 40px auto;
`;

const Position = styled.article`
  margin-bottom: 24px;
`;

export default PositionCard;