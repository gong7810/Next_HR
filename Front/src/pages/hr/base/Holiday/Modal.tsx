import React, { useEffect } from 'react';
import { Button, Divider, Grid, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { width } from '@mui/system';
import { dispatch } from 'store';
import { requestDeletetHoliday, requestInsertHoliday, requestUpdateHoliday } from 'store/slices/hr/base/holiday';

interface ModalTo {
    events?:any;
    isModalOpen:boolean;
    setIsModalOpen:boolean;
    closeModal: () => void; 
    addHoliday:()=>void;
    handleChange:()=>void;
    deleteHoliday:()=>void;
    modifyHoliday:()=>void;
    setNewHoliday?:any;
    newHoliday?:any;
    selectedEvent:()=>void;
  }


const Modal = ({ events,setIsModalOpen,closeModal,newHoliday,setNewHoliday,selectedEvent }:ModalTo) => {
    // const closeModal=()=>{
    //     setIsModalOpen(false);
    // }

    console.log(selectedEvent)

    useEffect(() => {
      if (selectedEvent) {
        const applyDay = selectedEvent._instance.range.start.toISOString().split('T')[0];
        setNewHoliday((prevHoliday) => ({
          ...prevHoliday,
          holidayName: selectedEvent._def.title,
          applyDay,
          note: selectedEvent._def.extendedProps.description,
        }));
      }
    }, [selectedEvent]);

    
    
    const addHoliday = () => {

        if (newHoliday.status === 'insert') {
          // 새로운 휴일을 추가하기 위한 Redux 액션을 디스패치합니다.
          // 아래는 예시일 뿐이며, 직접 사용하는 액션에 대한 디스패치로 교체해야 합니다.
          dispatch(requestInsertHoliday(newHoliday));
         
    
          // 휴일을 추가한 후에 입력 필드를 초기화합니다.
          setNewHoliday({
            applyDay: '',
            holidayName: '',
            note: '',
            status: 'insert',
          });
        }
      };
    
      const deleteHoliday=()=>{
        
        if (selectedEvent) {
          // 선택한 휴일 객체를 직접 수정하지 않고, status가 'delete'로 변경된 새로운 객체를 생성
          const updatedSelRow = { ...selectedEvent, status: 'delete' };
          console.log("updatedSelRow",updatedSelRow);
      
          try {
            if (updatedSelRow.status === 'delete') {
              const confirmDelete = window.confirm('삭제하시겠습니까?');
              if (confirmDelete) {
                const requestBody = {
                  note: updatedSelRow._def.extendedProps.description,
                  applyDay: updatedSelRow._instance.range.start.toISOString().split('T')[0],
                  holidayName: updatedSelRow._def.title,
                  status: updatedSelRow?.status,
                };
                // Redux 액션을 디스패치하여 상태 업데이트
                dispatch(requestDeletetHoliday(requestBody)); // updatedSelRow를 배열로 감싸서 보냅니다.
              }
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    
      const modifyHoliday=()=>{
        if (selectedEvent) {
          // 선택한 휴일 객체를 직접 수정하지 않고, status가 'delete'로 변경된 새로운 객체를 생성
          const updatedSelRow = { ...newHoliday, status: 'update'};
          console.log("updatedSelRow",updatedSelRow);
      
          try {
            if (updatedSelRow.status === 'update') {
              const confirmDelete = window.confirm('수정하시겠습니까?');
                if (confirmDelete) {
                  const requestBody = {
                    note: updatedSelRow.note||'',
                    applyDay: updatedSelRow.applyDay,
                    holidayName: updatedSelRow.holidayName,
                    status: updatedSelRow.status,
                  };
                  // Redux 액션을 디스패치하여 상태 업데이트
                  dispatch(requestUpdateHoliday(requestBody)); 

              }
            }
          } catch (error) {
            console.log(error);
          }
        }
      }

      
  const handleChange=(e)=>{
    const { name, value } = e.target;
    setNewHoliday((prevHoliday) => ({
      ...prevHoliday,
      [name]: value ,  // 해당 필드를 업데이트
    }));
    console.log("newHoliday",newHoliday)
  }

    return (
      <div>
        <h2>휴가 일정 추가</h2>
        {/* <ul>
          {events.map((event, index) => (
            <li key={index}>{event.title}</li>
          ))}
        </ul> */}
        <div  style={{ width: '100%' ,height:'100%'}}>
        <TextField 
        name="holidayName" value={newHoliday.holidayName}
        label="휴 일 명"  InputLabelProps={{ shrink: true, }}
        variant="outlined"
        margin="normal"
        style={{width:'600px'}}
        onChange={handleChange}
        >휴 일 명</TextField><br/>
        <TextField 
        name="note" value={newHoliday.note}
        label="비 고"  InputLabelProps={{ shrink: true, }}
        variant="outlined"
        margin="normal"
        style={{width:'600px'}}
        onChange={handleChange}
        >비 고 </TextField><br/>
        <TextField 
        name="applyDay" value={newHoliday.applyDay}
        label="일자" type='date'  InputLabelProps={{ shrink: true, }}
        variant="outlined"
        margin="normal"
        style={{width:'600px'}}
        onChange={handleChange}
        >일 자</TextField><br/>
        {/* 닫기 버튼 또는 아이콘을 추가하여 모달을 닫을 수 있음 */}
        <Button onClick={closeModal} variant="contained" >닫기</Button>
        <Button onClick={addHoliday} variant="contained" >저장</Button>
        <Button onClick={deleteHoliday} variant="contained" >삭제</Button>
        <Button onClick={modifyHoliday} variant="contained" >수정</Button>
        </div>
      </div>
    );
  };
export default Modal;