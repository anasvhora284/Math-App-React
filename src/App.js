import "./App.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import RadioGroup from "@mui/material/RadioGroup";
import CommonButton from "./Button";
import CommanRadiobtn from "./RadioButton";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

function App() {
  // For Output Screen
  let CF = 0;
  let rows = [],columns =[];
  let idCounter = 0;
  const re = /^[0-9,]+$/;
  const [currentScreen, setCurrentScreen] = useState("inputScreen");
  const [errorX, setErrorX] = useState(false);
  const [errorY, setErrorY] = useState(false);
  const [arrOfX, setArrOfX] = useState([]);
  const [arrOfY, setArrOfY] = useState([]);
  const [radiobtn, setRadiobtn] = useState("");
  const [valueOfX, setvalueOfX] = useState("");
  const [valueOfY, setvalueOfY] = useState("");
  const [rowsData,setRowsData] = useState([]);

  // eslint-disable-next-line no-unused-expressions
  const handleNext = () => {
    if (currentScreen === "inputScreen") {
      if (valueOfX.trim().length && valueOfY.trim().length) {
        setCurrentScreen("optionScreen");
        input();
      }
      !valueOfX.trim().length ? setErrorX(true) : setErrorX(false);
      !valueOfY.trim().length ? setErrorY(true) : setErrorY(false);
    } else {
      setCurrentScreen("outputScreen");
    }
  };

  const handlePrevious = () => {
    if (currentScreen === "outputScreen") {
      setCurrentScreen("optionScreen");
    } else {
      setCurrentScreen("inputScreen");
    }
  };

  const getParentBtnClassName = () => {
    return `${
      currentScreen === "inputScreen" ? "inputScreen-Next" : "optionScreen-Next"
    } navigation-buttons`;
  };

  const handleRadio = (event) => {
    setRadiobtn(event.target.value);
  };

  const handleChangeX = (e) => {
    if (e.target.value === "" || re.test(e.target.value)) {
      setvalueOfX(e.target.value);
      setErrorX(false);
    }
  };

  const handleChangeY = (e) => {
    if (e.target.value === "" || re.test(e.target.value)) {
      setvalueOfY(e.target.value);
      setErrorY(false);
    }
  };

  React.useEffect(() => {
    if (arrOfX.length > arrOfY.length) {
      arrOfX.forEach((value, index) => {
        !arrOfY[index]
          ? (arrOfY[index] = 0)
          : (arrOfY[index] = parseInt(arrOfY[index]));
        !arrOfX[index]
          ? (arrOfX[index] = 0)
          : (arrOfX[index] = parseInt(arrOfX[index]));
      });
    } else {
      arrOfY.forEach((_, index) => {
        !arrOfY[index]
          ? (arrOfY[index] = 0)
          : (arrOfY[index] = parseInt(arrOfY[index]));
        !arrOfX[index]
          ? (arrOfX[index] = 0)
          : (arrOfX[index] = parseInt(arrOfX[index]));
      });
    }
    console.log(arrOfX);
    console.log(arrOfY);
  }, [arrOfX, arrOfY]);

  function input() {
    valueOfX.trim().length
      ? setArrOfX(valueOfX.replaceAll(" ", "").split(","))
      : setErrorX(true);
    valueOfY.trim().length
      ? setArrOfY(valueOfY.replaceAll(" ", "").split(","))
      : setErrorY(true);
  }

  const rowData = (value) => {
    idCounter+=1;
    return {
      id: idCounter,
      xi: arrOfX[value],
      yi: arrOfY[value],
      xi2: arrOfX[value] ** 2,
      yi2: arrOfY[value] ** 2,
      xiyi: arrOfX[value] * arrOfY[value],
    }
  }

  rows = [
    rowData(0),
    rowData(1),
    rowData(2),
    rowData(3),
    rowData(4),
  ];

  switch (radiobtn) {
    case 'Mean':
      columns = [
        {
          field: "xi",
          headerName: "Xi",
          flex: 1,
          sortable: false,
          align:'center',
          headerAlign: 'center',
          filterable: false,
        },
        {
          field: "yi",
          headerName: "Yi",
          flex: 1,
          sortable: false,
          align:'center',
          headerAlign: 'center',
          filterable: false,
        },
        {
          field: "xiyi",
          headerName: "Xi * Yi",
          flex: 1,
          description: "", 
          align:'center',
          headerAlign: 'center',
          sortable: false,
          filterable: false,
        },
      ]
    break;

    case 'Median':
      columns = [
        {
          field: "xi",
          headerName: "Xi",
          flex: 1,
          sortable: false,
          align:'center',
          headerAlign: 'center',
          filterable: false,
        },
        {
          field: "yi",
          headerName: "Yi",
          flex: 1,
          sortable: false,
          align:'center',
          headerAlign: 'center',
          filterable: false,
        },
        {
          field: "cf",
          headerName: "C.F",
          flex: 1,
          sortable: false,
          align:'center',
          headerAlign: 'center',
          filterable: false,
        },
      ]
    break;

    case 'Mode':
      columns = [
        {
          field: "xi",
          headerName: "Xi",
          flex: 1,
          sortable: false,
          align:'center',
          headerAlign: 'center',
          filterable: false,
        },
        {
          field: "yi",
          headerName: "Yi",
          flex: 1,
          sortable: false,
          align:'center',
          headerAlign: 'center',
          filterable: false,
        },
      ]
    break;

    case 'Standard Deviation':
      columns = [
        {
          field: "xi",
          headerName: "Xi",
          flex: 1,
          sortable: false,
          align:'center',
          headerAlign: 'center',
          filterable: false,
        },
        {
          field: "yi",
          headerName: "Yi",
          flex: 1,
          sortable: false,
          align:'center',
          headerAlign: 'center',
          filterable: false,
        },
        {
          field: "xiyi",
          headerName: "Xi * Yi",
          flex: 1,
          description: "", 
          align:'center',
          headerAlign: 'center',
          sortable: false,
          filterable: false,
        },
        {
          field: "xi-mean^2",
          headerName: "(Xi - Mean)²",
          flex: 1,
          description: "", 
          align:'center',
          headerAlign: 'center',
          sortable: false,
          filterable: false,
        }
      ]
    break;

    case 'CoRelation CoEfficient':
      columns = [
        {
          field: "xi",
          headerName: "Xi",
          flex: 1,
          sortable: false,
          align:'center',
          headerAlign: 'center',
          filterable: false,
        },
        {
          field: "yi",
          headerName: "Yi",
          flex: 1,
          sortable: false,
          align:'center',
          headerAlign: 'center',
          filterable: false,
        },
        { 
          field: "xi2", 
          headerName: "Xi²", 
          flex: 1,
          sortable: false,
          align:'center',
          headerAlign: 'center',
          filterable: false,
         },
        {
          field: "yi2",
          headerName: "Yi²",
          flex: 1,
          type: "number",
          align:'center',
          headerAlign: 'center',
          sortable: false,
          filterable: false,
        },
        {
          field: "xiyi",
          headerName: "Xi * Yi",
          flex: 1,
          description: "", 
          align:'center',
          headerAlign: 'center',
          sortable: false,
          filterable: false,
        },
      ];
    break;
  
    default:
    
    break;
  }


  return (
    <div className="App">
      <Box className="cardBox">
        <Card
          className={`card ${currentScreen === "outputScreen" ? 'output_card' : ''}`}
          sx={{
            backgroundColor: "#333333",
            color: "#c3c746",
            borderRadius: "5%",
            height: "70%",
            position: "relative",
          }}
        >
          {/* Input from user window */}

          {currentScreen === "inputScreen" && (
            <div className="input-div">
              <h2 className="card-title">Hello there!</h2>
              <p className="card-text">
                This website is designd to make your calculations faster! Here
                you can Calculate Mean, Median, Mod, CoRelation CoEfficient &
                many more.
                <br />
                <br />
                Pleae Enter the data of X and Y in Below Field. <br />
                I.E:- X: 1, 2, 3, 4 & Y: 5, 6, 7, 8
              </p>
              <div className="text-field-group">
                <div className="text-field">
                  <h3>Xi:</h3>
                  <input
                    value={valueOfX}
                    autoComplete="off"
                    onChange={handleChangeX}
                    placeholder="1, 2, 3, 4"
                    id="Xi"
                  />
                </div>
                {errorX && (
                  <p className="error-msg">Please enter valid input of X.</p>
                )}

                <div className="text-field">
                  <h3>Yi:</h3>
                  <input
                    value={valueOfY}
                    autoComplete="off"
                    onChange={handleChangeY}
                    placeholder="5, 6, 7, 8"
                    id="Yi"
                  />
                </div>
                {errorY && (
                  <p className="error-msg">Please enter valid input of Y.</p>
                )}
              </div>
            </div>
          )}

          {/* Choose Options For Output */}

          {currentScreen === "optionScreen" && (
            <div className="options">
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Mean"
                name="radio-buttons-group"
              >
                <CommanRadiobtn handleRadio={handleRadio} value="Mean" />
                <CommanRadiobtn handleRadio={handleRadio} value="Median" />
                <CommanRadiobtn handleRadio={handleRadio} value="Mode" />
                <CommanRadiobtn
                  handleRadio={handleRadio}
                  value="Standard Deviation"
                />
                <CommanRadiobtn
                  handleRadio={handleRadio}
                  value="CoRelation CoEfficient"
                />
              </RadioGroup>
            </div>
          )}

          {/* Output Screen */}

          {currentScreen === "outputScreen" && (
            // <TableContainer>
            //   <Table>
            //     <TableHead>
            //       <TableRow>
            //         <TableCell>Xi</TableCell>
            //         <TableCell>Yi</TableCell>
            //         {radiobtn === 'CoRelation CoEfficient' && <TableCell>Xi²</TableCell>}
            //         {radiobtn === 'CoRelation CoEfficient' && <TableCell>Yi²</TableCell>}
            //         {(radiobtn !== 'Median' && radiobtn !== 'Mode') && <TableCell>Xi*Yi</TableCell>}
            //         {radiobtn === 'Median' && <TableCell>C.F</TableCell>}
            //         {radiobtn === 'Standard Deviation' && <TableCell>(Xi - Mean)²</TableCell>}
            //       </TableRow>
            //     </TableHead>
            //     <TableBody>
            //       {arrOfX.forEach((value, index) => {
            //         let mean = 0,sOfY=0,sOfXY=0;
            //         // arrOfY.forEach((value, index) => {
            //         //   sOfY += arrOfY[index];
            //         //   sOfXY += value * arrOfY[index];
            //         // });
            //         // mean = sOfXY / sOfY;

            //         <TableRow>
            //           <TableCell>{value}</TableCell>
            //           <TableCell>{arrOfY[index]}</TableCell>
            //           {radiobtn === 'CoRelation CoEfficient' && <TableCell>{value ** 2}a</TableCell>}
            //           {radiobtn === 'CoRelation CoEfficient' && <TableCell>{arrOfY[index] ** 2}</TableCell>}
            //           {(radiobtn !== 'Median' && radiobtn !== 'Mode') && <TableCell>{value * arrOfY[index]}</TableCell>}
            //           {radiobtn === 'Median' && <TableCell>{CF = CF+arrOfY[index]}</TableCell>}
            //           {radiobtn === 'Standard Deviation' && <TableCell>{(value - mean) ** 2}</TableCell>}
            //         </TableRow>
            //       })}

            //     </TableBody>
            //   </Table>
            // </TableContainer>
            <div style={{ height: "94.02%", width: "100%" }}>
              <DataGrid
                sx={{color: 'yellow', borderColor: 'green'}}
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                getRowId={(row) => row.id}
                disableColumnMenu
                disableSelectionOnClick
              />
            </div>
          )}

          <div className={getParentBtnClassName()}>
            {currentScreen !== "inputScreen" && (
              <CommonButton
                idOfBtn="previous"
                handlePrevious={handlePrevious}
                value="&#60; Previous"
              />
            )}
            {currentScreen !== "outputScreen" && (
              <CommonButton
                idOfBtn="next"
                handleNext={handleNext}
                value="Next &#62;"
              />
            )}
          </div>
        </Card>
      </Box>
    </div>
  );
}
export default App;
