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
  let 
    sOfX = 0,
    CF = 0,
    sOfY = 0,
    sOfX2 = 0,
    sOfY2 = 0,
    sOfXY = 0,
    sOfXM2 = 0,
    mean = 0,
    median = 0,
    mode = 0,
    standard_D = 0,
    coRelation_E = 0
  ;

  let rows = [],columns =[];
  let idCounter = 0;
  const re = /^[0-9,]+$/;
  const [currentScreen, setCurrentScreen] = useState("inputScreen");
  const [errorX, setErrorX] = useState(false);
  const [errorY, setErrorY] = useState(false);
  const [arrOfX, setArrOfX] = useState([]);
  const [arrOfY, setArrOfY] = useState([]);
  const [radiobtn, setRadiobtn] = useState('');
  const [valueOfX, setvalueOfX] = useState("");
  const [valueOfY, setvalueOfY] = useState("");
  let [rowData, setRowsData] = useState([]);

  // eslint-disable-next-line no-unused-expressions
  const handleNext = () => {
    if (currentScreen === "inputScreen") {
      if (valueOfX.trim().length && valueOfY.trim().length) {
        setRadiobtn("Mean")
        setCurrentScreen("optionScreen");
        input();
      }
      !valueOfX.trim().length ? setErrorX(true) : setErrorX(false);
      !valueOfY.trim().length ? setErrorY(true) : setErrorY(false);
    } else {
      
      let cf = 0;
      const UpdatedRowData = arrOfX.map((xi, index) => {
          return {
            id: index + 1,
            xi,
            yi: arrOfY[index],
            xi2: arrOfX[index] ** 2,
            yi2: arrOfY[index] ** 2,
            xiyi: arrOfX[index] * arrOfY[index],
            cf: cf += arrOfY[index],
            xm2: ((arrOfX[index] - mean) ** 2).toFixed(4),
          }
      })  

      setRowsData(UpdatedRowData);
      setCurrentScreen("outputScreen");
    }
  };

  const handlePrevious = () => {
    if (currentScreen === "outputScreen") {
      setRadiobtn(radiobtn);
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

  
  arrOfX.forEach((value, index) => {
    sOfX += value;
    sOfY += arrOfY[index];
    sOfX2 += value * value;
    sOfY2 += arrOfY[index] * arrOfY[index];
    sOfXY += value * arrOfY[index];
    sOfXM2 += (value - (sOfXY/sOfY)) ** 2;
    CF += arrOfY[index]
    mean = sOfXY/sOfY; 
    median = calculate_Median();
    mode = calculate_Mode();
    standard_D = calculate_SD();
    coRelation_E = calculate_CR();
  });

  function input() {
    valueOfX.trim().length
      ? setArrOfX(valueOfX.replaceAll(" ", "").split(","))
      : setErrorX(true);
    valueOfY.trim().length
      ? setArrOfY(valueOfY.replaceAll(" ", "").split(","))
      : setErrorY(true);
  }

  // rows = [
  //   rowData()
  // ];

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
          field: "xm2",
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

  function calculate_Median() {
    let ans = sOfY / 2;
    let sumY = 0;
    for (let index = 0; index < arrOfX.length; index++) {
      sumY += arrOfY[index];
      if (sumY < ans) {
        continue;
      } else {
        console.log(arrOfX[index]);
        return (arrOfX[index]);
      }
    }
  }

  function calculate_Mode (params) {
    let ans = Math.max(...arrOfY);
    for (let index = 0; index < arrOfX.length; index++) {
      if (arrOfY[index] === ans) {
        return(arrOfX[index]);
      } else {
        continue;
      }
    }
  };

  function calculate_SD(params) {
    return(sOfXM2 / (arrOfY.length - 1) ** 1/2);
  }

  function calculate_CR(params) {
    return ((sOfXY - (sOfX * sOfY) / arrOfX.length) / 
    (Math.sqrt(sOfX2 - (sOfX * sOfX) / arrOfX.length) * 
    Math.sqrt(sOfY2 - (sOfY * sOfY) / arrOfX.length)))
  }


  return (
    <div className="App">
      <Box className={`cardBox ${currentScreen === "outputScreen" ? 'outputcard_width' : '' }`}>
        <Card
          className={`card ${currentScreen === "outputScreen" ? 'output_card' : ''}`}
          sx={{
            backgroundColor: "#333333",
            color: "#c3c746",
            borderRadius: "5%",
            height: "70%",
            width: "70%",
            position: "relative",
          }}
        >
          {/* Input from user window */}

          {currentScreen === "inputScreen" && (
            <div className="input-div">
              <h2 className="card-title">Hello there!</h2>
              <p className="card-text">
                This website is designed to make your calculations faster! Here
                you can Calculate Mean, Median, Mode, Corelation Corfficient &
                many more coming soon!.
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
                name="controlled-radio-buttons-group"
                value={radiobtn}
                onChange={handleRadio}
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
            <div className="output-div">
              <DataGrid
                className="datagrid"
                sx={{
                  color: 'yellow', 
                  borderColor: 'green',
                }}
                rows={rowData}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                getRowId={(row) => row.id}
                disableColumnMenu
                disableSelectionOnClick 
                hideFooter = {arrOfX.length <= 5 ? true : false}
              />
              <div className="output_writings">
                <p> The sum of Xi is: {sOfX}</p>
                <p> The sum of Yi is: {sOfY}</p>
                {radiobtn === 'CoRelation CoEfficient' && 
                  <p> The sum of Xi² is: {sOfX2}</p>
                }

                {radiobtn === 'CoRelation CoEfficient' && 
                  <p> The sum of Yi² is: {sOfY2}</p>
                }

                {(radiobtn !== 'Median' && radiobtn !== 'Mode') && 
                  <p> The sum of Xi*Yi is: {sOfXY}</p>
                }

                {radiobtn === 'Standard Deviation' && 
                  <p> The sum of (Xi - Mean)² is: {sOfXM2.toFixed(4)}</p>
                }

                {radiobtn === 'Median' && 
                  <p> The sum of Yi or N: {CF}</p>
                }

                {radiobtn === 'Mean' && 
                  <p> The Mean of the data is : {mean.toFixed(4)}</p>
                }

                {radiobtn === 'Median' && 
                  <p> The Median of the data is : {median}</p>
                }

                {radiobtn === 'Mode' && 
                  <p> The Mode of the data is : {mode}</p>
                }

                {radiobtn === 'Standard Deviation' && 
                  <p> The Standard Deviation of the data is : {standard_D.toFixed(4)}</p>
                }

                {radiobtn === 'CoRelation CoEfficient' && 
                  <p> The CoRelation CoEfficient of the data is : {coRelation_E.toFixed(4)}</p>
                }
              </div>
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
