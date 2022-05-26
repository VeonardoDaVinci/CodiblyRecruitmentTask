import './App.css';
import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: "bold",
  },
  // [`&.${tableCellClasses.body}`]: {
  //   fontSize: 14,
  // },
}));


function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [reqText, setReqText] = useState(null);


  let searchId = "";
  let reqText = "";
  let page = "";

function handleChange(event){
    searchId = event.target.value;
    console.log(searchId);
    page = "";
    reqText = 'https://reqres.in/api/products?per_page=5&page='+page+'&id='+searchId;
    fetch(reqText)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        setData(actualData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
};



  useEffect(() => {
    reqText = 'https://reqres.in/api/products?per_page=5&page='+page+'&id='+searchId;
    console.log(reqText);
    // let reqText = 'https://reqres.in/api/products';
    fetch(reqText)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        setData(actualData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}
      <Container maxWidth="md">
      <TextField
        id="outlined-number searchId"
        label="Search ID"
        type="number"
        onChange = {handleChange}
        align="left"
        sx={{
          float: "left",
          marginTop: "20px",
          marginBottom: "20px"
        }}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Year</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {data && data.data.length > 0 && data.data.map(({ id, name, year, color, pnatone_value }) => (
                <TableRow
                key={id}
                sx={{ bgcolor: color,
                  '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {id}
                </TableCell>
                <TableCell align="right">{name}</TableCell>
                <TableCell align="right">{year}</TableCell>
              </TableRow>
              ))}


          {data &&
                <TableRow
                key={data.data.id}
                sx={{ bgcolor: data.data.color,
                  '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {data.data.id}
                </TableCell>
                <TableCell align="right">{data.data.name}</TableCell>
                <TableCell align="right">{data.data.year}</TableCell>
              </TableRow>
              }
          </TableBody>
        </Table>
      </TableContainer>
      </Container>
    </div>
  );
}

export default App;
