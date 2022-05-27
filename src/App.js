import './App.css';
import { useState, useEffect} from 'react';
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
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


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

  let url = new URL(window.location.href)
  let params = new URLSearchParams(url.searchParams);
  if (!params.has('page')){
    params.set('page', '1');
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
  }
  let page = params.getAll('page');
  let searchId = params.getAll('searchId');


  function fetchData(searchId="", page=""){
    document.querySelector("#outlined-number-searchId").value = searchId;
    page = params.getAll('page');
    console.log(page);
    searchId = params.getAll('searchId');
    let reqText = 'https://reqres.in/api/products?per_page=5&page='+page+'&id='+searchId;
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
  }

  function handleChange(event){
      searchId = event.target.value;
      params.set('page', '1');
      params.set('searchId', searchId);
      window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
      // console.log(idparam.getAll('searchId'));
      fetchData(searchId,page);
  };

  function handlePagination(event, pageNumber){
    page = pageNumber;
    params.set('page', page);
    params.set('searchId', '');
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
    fetchData(searchId,page);
    document.querySelector("#outlined-number-searchId").value = "";
  }

  useEffect(() => {
    fetchData(searchId,page);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App">
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the post data - ${error}`}</div>
      )}

      <Container maxWidth="md">
      <TextField
        id="outlined-number-searchId"
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
          {data && data.data.length > 1 && data.data.map(({ id, name, year, color, pnatone_value }) => (
                <TableRow
                key={id}
                role="datatablerow"
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


          {data && !data.data.length &&
                <TableRow
                key={data.data.id}
                role="datatablerow"
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
      <Pagination
        count={data && data.total_pages}
        siblingCount = {0}
        boundaryCount = {0}
        showFirstButton = {false}
        showLastButton = {false}
        onChange={handlePagination}
        page={parseInt(page[0])}
        sx={{marginTop:"20px"}}
        renderItem={(item) => (
          <PaginationItem
            components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
      </Container>

    </div>
  );
}

export default App;
