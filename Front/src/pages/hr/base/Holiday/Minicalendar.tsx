// import React, { useEffect, useState } from 'react';
// import { Button, Divider, Grid, TextField,Dialog ,Typography} from '@mui/material';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { width } from '@mui/system';
// import { dispatch } from 'store';
// import { requestDeletetHoliday, requestInsertHoliday, requestUpdateHoliday } from 'store/slices/hr/base/holiday';
// import { DatePicker } from '@mui/x-date-pickers';

// interface ModalTo {
//     events?:any;
//     isModalOpen:boolean;
//     setIsModalOpen:boolean;
//     closeModal: () => void; 
//     addHoliday:()=>void;
//     handleChange:()=>void;
//     deleteHoliday:()=>void;
//     modifyHoliday:()=>void;
//     setNewHoliday?:any;
//     newHoliday?:any;
//     selectedEvent:()=>void;
//     miniOpen:boolean;
//   }


// const Minicalendar = ({miniOpen}:ModalTo) => {
//   const [selectedDate, setSelectedDate] = useState<Date | null>(null);

//   const handleDateChange = (date: Date | null) => {
//     setSelectedDate(date);
//   };

//     console.log("야ㅐ호")
   

//     return (
//     //   <Dialog open={miniOpen} maxWidth="xs" fullWidth style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
//     //     <Grid>
//     //     <TextField 
//     //     name="applyDay" 
//     //     label="시 작 일" type='date'  InputLabelProps={{ shrink: true, }}
//     //     variant="outlined"
//     //     margin="normal"
//     //     >시 작 일 </TextField><br/>
//     //     {/* <TextField 
//     //     name="applyDay" 
//     //     label="종 료 일" type='date'  InputLabelProps={{ shrink: true, }}
//     //     variant="outlined"
//     //     margin="normal"
//     //     >종 료 일</TextField><br/>
//     //     <Button variant="contained">조 회</Button> */}
//     //     </Grid>
//     // </Dialog>
//     <Dialog open={miniOpen} maxWidth="xs" fullWidth>
//       <DatePicker
//         label="Select Date"
//         value={selectedDate}
//         onChange={handleDateChange}
//         renderInput={(params) => <TextField {...params} variant="outlined" />}
//       />
//     </Dialog>
//     );
//   };
// export default Minicalendar;