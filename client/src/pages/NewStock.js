import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { Button, Error, FormField, Input, Label, Textarea } from "../styles";

function NewStock({ user }) {
  const [symbol, setSymbol] = useState("Search for ticker here...");
  const [userId, setUserId] = useState("");

  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/stocks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        symbol,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then(data => 
            fetch(`/stocks/${data.id}`, {
                method: "PATCH",
            })
            ).then(() => history.push("/stocks"));
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <Wrapper>
      <WrapperChild>
        <h2>Create Portfolio</h2>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="symbol">Symbol</Label>
            <Input
              type="text"
              id="symbol"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            />
          </FormField>
          <FormField>
            <Button color="primary" type="submit">
              {isLoading ? "Loading..." : "Add Stock"}
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
        <h1>{symbol}</h1>
        <p>
          <cite>Added by: {user.username}</cite>
        </p>
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

export default NewStock;