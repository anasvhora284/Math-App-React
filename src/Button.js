import { Button } from "@mui/material";

const CommonButton = ({value, idOfBtn, handleNext, handlePrevious}) => {
  return (
    <Button className='button' id={idOfBtn} onClick={handleNext || handlePrevious} variant="contained">{value}</Button>
  )
}
export default CommonButton;