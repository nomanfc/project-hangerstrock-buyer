import styled from "@emotion/styled";

export const BasicTableContainer = styled.div`
  width: 100%;
  margin: auto;
`;

export const table = styled.table`
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin: auto;
  color: white;
`;
export const thead = styled.thead`
  border: 1px solid #deecd3;
`;
export const tfoot = styled.tfoot``;
export const th = styled.th`
  text-align: center;
  width: fit-content;
  padding: 15px;
  font-size: 13px;
  background-color: #deecd3;
  color: green;
`;
export const span = styled.span`
  display: flex;
  align-items: center;
  width: fit-content;
  gap: 5px;
`;

// export const tfd = styled.td`
//     border: 1px solid #ddd;
//     padding: 8px;
//     padding-top: 12px;
//     padding-bottom: 12px;
//     text-align: left;
//     background-color: #4CAF50;
//     color: white;
// `

export const tr = styled.tr`
  :nth-of-type(even) {
    background-color: #f8f8f8;
    color: black;
  }
  :nth-of-type(odd) {
    background-color: white;
    color: black;
  }
  width: fit-content;
`;
export const tbody = styled.tbody``;
export const td = styled.td`
  border: 1px solid #deecd3;
  padding-left: 15px;
  width: fit-content;
  font-size: 13px;
  text-align: left;
`;

export const navButton = styled.button`
  padding: 5px;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 2px;
`;

export const buttonCon = styled.div`
  display: flex;
  width: fit-content;
  gap: 10px;
  margin-left: 50%;
  align-items: center;
  margin: auto;
`;

export const showSize = styled.p`
  font-size: 14px;
  display: flex;
`;

export const edit = styled.button`
  width: 40%;
  height: auto;
  cursor: pointer;
`;
export const del = styled.button`
  width: 40%;
  height: auto;
  cursor: pointer;
`;

export const actionCon = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
`;
