import styled from "styled-components";

export const FormDivStyles = styled.div`
  display: flex;
  justify-content: center;
  form {
    width: 50vw;
    display: flex;
    flex-direction: column;
    gap: 20px;

    input,
    textarea {
      padding: 10px;
      line-height: 1.5;
      border-radius: 5px;
    }
  }
`;
