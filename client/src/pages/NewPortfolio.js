import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { Button, Error, FormField, Input, Label, Select } from "../styles";

function NewPortfolio({ user }) {
  const [name, setName] = useState("Enter Portfolio name here...");
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [clientId, setClientId] = useState("");
  

  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    fetch(`/api/users`)
    .then((r) => r.json())
    .then(setUsers)
}, []);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/portfolios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        user_id: userId,
        client_id: clientId,
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
        <h2>Create Portfolio</h2>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="name">Portfolio Name</Label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="userId">Financial Advisor</Label>
            <Select
              type="text"
              defaultValue={"default"}
              id="userId"
              onChange={(e) => setUserId(e.target.value)}>
                <option value={"default"} disabled>Select a Financial Advisor</option>
                {users.map((user, index) => <option key={index} value={user.id}>{user.username}</option>)}
            </Select>
          </FormField>
          <FormField>
            <Label htmlFor="clientId">Client</Label>
            <Select
              type="text"
              defaultValue={"default"}
              id="clientId"
              onChange={(e) => setClientId(e.target.value)}>
                <option value={"default"} disabled>Select a Client</option>
                {users.map((user, index) => <option key={index} value={user.id}>{user.username}</option>)}
            </Select>
          </FormField>
          <FormField>
            <Button color="primary" type="submit">
              {isLoading ? "Loading..." : "Submit Portfolio"}
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
        <h1>{name}</h1>
        <p>
          <em>Created by: {user.username}</em>
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

export default NewPortfolio;
