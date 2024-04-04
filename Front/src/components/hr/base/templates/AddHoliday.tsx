import { ReactElement, useEffect, useState } from 'react';

// material-ui
import { Button, CardContent, Divider, Grid, TextField } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import InputLabel from 'ui-component/extended/Form/InputLabel';
import { HolidayTO } from 'pages/hr/base/types/types';
import { useDispatch } from 'react-redux';
import { deleteHolidaySuccess, requestDeletetHoliday, requestInsertHoliday, requestUpdateHoliday } from 'store/slices/hr/base/holiday';

// ==============================|| Sticky ActionBar ||============================== //

function AddHoliday({ holidayList, setSelRow, selRow }: any) {
  const dispatch = useDispatch();

  const [newHoliday, setNewHoliday] = useState<HolidayTO>({
    applyDay: selRow ? selRow.applyDay : '', // 선택한 행의 데이터를 초기값으로 설정
    holidayName: selRow ? selRow.holidayName : '', // 선택한 행의 데이터를 초기값으로 설정
    note: selRow ? selRow.note : '', // 선택한 행의 데이터를 초기값으로 설정
    status: 'insert'
  });

  const handleTextFieldChange = (event: any) => {
    const { name, value } = event.target;
    console.log('뭐가나오나 궁금하다name', name);
    console.log('뭐가나오나 궁금하다value', value);
    setNewHoliday({ ...newHoliday, [name]: value });
    console.log(` value: ${value}`);
    console.log('뭐가나오나 궁금하다~~~', newHoliday);
  };

  useEffect(() => {
    setNewHoliday({
      applyDay: selRow ? selRow.applyDay : '',
      holidayName: selRow ? selRow.holidayName : '',
      note: selRow ? selRow.note : '',
      status: 'insert'
    });
  }, [selRow]);

  const addHoliday = () => {
    // 만약 newHoliday의 상태가 'insert'인 경우에만 실행
    if (newHoliday.status === 'insert') {
      // 새로운 휴일을 추가하기 위한 Redux 액션을 디스패치합니다.
      dispatch(requestInsertHoliday(newHoliday));

      // 휴일을 추가한 후에 입력 필드를 초기화합니다.
      setNewHoliday({
        applyDay: '',
        holidayName: '',
        note: '',
        status: 'insert'
      });
    }
  };

  const modifyHoliday = () => {
    if (selRow) {
      // 선택한 휴일 객체를 직접 수정하지 않고, status가 'update'로 변경된 새로운 객체를 생성
      const updatedSelRow = { ...selRow, status: 'update' };
      updatedSelRow.applyDay = newHoliday.applyDay; // 일자 수정
      updatedSelRow.holidayName = newHoliday.holidayName; // 휴일명 수정
      updatedSelRow.note = newHoliday.note || ''; // 비고 수정
      console.log('updatedSelRow', updatedSelRow);

      // Redux 액션을 디스패치하여 상태 업데이트
      dispatch(requestUpdateHoliday(updatedSelRow)); // updatedSelRow를 배열로 감싸서 보냅니다.

      // 선택한 행 초기화
      setSelRow(null);
    }
  };

  const deleteHoliday = () => {
    if (selRow) {
      // 선택한 휴일 객체를 직접 수정하지 않고, status가 'delete'로 변경된 새로운 객체를 생성
      const updatedSelRow = { ...selRow, status: 'delete' };
      console.log(updatedSelRow);

      try {
        if (updatedSelRow.status === 'delete') {
          const confirmDelete = window.confirm('삭제하시겠습니까?');
          if (confirmDelete) {
            // Redux 액션을 디스패치하여 상태 업데이트
            dispatch(requestDeletetHoliday(updatedSelRow)); // updatedSelRow를 배열로 감싸서 보냅니다.
            setSelRow(null);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Page title="Sticky Action Bar">
      <MainCard content={false} sx={{ overflow: 'visible' }}>
        <Divider />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3} lg={4}>
              <InputLabel>일 자 :</InputLabel>
            </Grid>
            <Grid item xs={12} sm={9} lg={6}>
              {/* <TextField id='applyDay' name='applyDay'  fullWidth value={newHoliday.applyDay} onChange={handleTextFieldChange}  /> */}
              <TextField
                id="applyDay"
                name="applyDay"
                fullWidth
                value={newHoliday.applyDay}
                type={'date'}
                onChange={handleTextFieldChange}
                // InputLabelProps={{ shrink: true, }}
              />
            </Grid>
            <Grid item xs={12} sm={3} lg={4}>
              <InputLabel>휴 일 명 :</InputLabel>
            </Grid>
            <Grid item xs={12} sm={9} lg={6}>
              <TextField id="holidayName" name="holidayName" fullWidth value={newHoliday.holidayName} onChange={handleTextFieldChange} />
            </Grid>
            <Grid item xs={12} sm={3} lg={4}>
              <InputLabel>비 고 :</InputLabel>
            </Grid>
            <Grid item xs={12} sm={9} lg={6}>
              <TextField id="note" name="note" fullWidth value={newHoliday.note} onChange={handleTextFieldChange} />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={4}>
              <Button onClick={addHoliday} variant="contained" fullWidth>
                추가
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button onClick={deleteHoliday} variant="contained" fullWidth>
                삭제
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button onClick={modifyHoliday} variant="contained" fullWidth>
                수정
              </Button>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </MainCard>
    </Page>
  );
}

AddHoliday.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default AddHoliday;
