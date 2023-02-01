import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';

const CommanRadiobtn = ({value, handleRadio}) => {
  return ( <FormControlLabel value={value} control={<Radio sx={{
    color: "#fff",
    '&.Mui-checked': {
    color: "#fff",
    },
  }}/>} label={value} /> )
}

export default CommanRadiobtn;