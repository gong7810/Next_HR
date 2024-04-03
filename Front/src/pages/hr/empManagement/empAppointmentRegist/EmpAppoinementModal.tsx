import React, { useRef, useState, useEffect, RefObject } from 'react';

// material-ui
import {
  Button,
  CardContent,
  Grid,
  IconButton,
  Modal,
  CardProps,
  FormControl,
  Select,
  MenuItem,
  DialogContent,
  Stack,
  TextField
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';

// assets
import CloseIcon from '@mui/icons-material/Close';
import InputLabel from 'ui-component/extended/Form/InputLabel';
import { useDispatch, useSelector } from 'react-redux';
import { empAppointmentAction } from '../slices/empAppointmentRegistReducer';
import { dataType, AppointmentEmpInfo } from '../types/empManagementTypes';
interface BodyProps extends CardProps {
  modalStyle: React.CSSProperties;
  handleClose: () => void;
  saveHandler: () => void;
  empCode: string;
  hosu: string;
  empname: any;
  deptChangeHandler: (value: string) => void;
  empNameref: any;
  deptcode: any;
  defaultDeptname: any;
  positionChangeHandler: (value: string) => void;
  positionCode: string;
  defaultPositionName: string;
  typeChangeHandler: (value: string) => void;
  selectedType: string;
  appointmentDateRef: RefObject<HTMLInputElement>;
  appointmentEndDateRef: RefObject<HTMLInputElement>;
}

// 해당 모델이 열리면 hosu도 가지고 오게 한다.
// ==============================|| SIMPLE MODAL ||============================== //

export default function EmpAppoinementModal(props: { toggle: () => void; emp: AppointmentEmpInfo[] }) {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const dispatch = useDispatch();
  const hosu = useSelector((state: any) => state.empManagement.empAppointment.hosu);
  const [open] = useState(true);
  const [deptCodeState, setDept] = useState<number | string>(-1);
  const [positionCodeState, setPosition] = useState<number | string>(-1);
  const [appointmentType, setAppointmentType] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('부서이동');
  console.log('hosu at modal is : ', hosu);
  // props로 전달받은 데이터를 해체해서 사용한다.
  const empNameRef = useRef<HTMLInputElement>(null);
  const appointmentDateRef = useRef<HTMLInputElement>(null);
  const appointmentEndDateRef = useRef<HTMLInputElement>(null);
  const { empCode, empName, deptCode, positionCode } = props.emp[0];
  let defaultDeptName = '';

  useEffect(() => {
    dispatch(empAppointmentAction.GET_HOSU_REQUESTED());
    console.log('empAppointmentModal data is ', deptCode, positionCode);
  }, [dispatch, deptCode, positionCode]);

  const deptChangeHandler = (value: string) => {
    setDept(value);
    console.log(value);
  };

  const positionChangeHandler = (value: string | number) => {
    setPosition(value);
    console.log(value);
  };

  const typeChangeHandler = (value: string) => {
    setSelectedType(value);
    console.log(value);
    setAppointmentType(value);
  };

  switch (deptCode) {
    case 'DEP000':
      console.log('회계팀입니다.');
      defaultDeptName = '회계팀';
      break;
    case 'DEP001':
      console.log('인사팀입니다.');
      defaultDeptName = '인사팀';
      break;
    case 'DEP002':
      console.log('전산팀입니다.');
      defaultDeptName = '전산팀';
      break;
    case 'DEP003':
      console.log('보안팀입니다.');
      defaultDeptName = '보안팀';
      break;
    case 'DEP004':
      console.log('개발팀입니다.');
      defaultDeptName = '개발팀';
      break;
  }

  let defaultPositionName = '';

  switch (positionCode) {
    case 'POS000':
      defaultPositionName = '인턴';
      console.log('인턴입니다.');
      break;
    case 'POS001':
      defaultPositionName = '사원';
      console.log('사원입니다.');
      break;
    case 'POS002':
      defaultPositionName = '대리';
      console.log('대리입니다.');
      break;
    case 'POS003':
      defaultPositionName = '팀장';
      console.log('팀장입니다.');
      break;
    case 'POS004':
      defaultPositionName = '부장';
      console.log('부장입니다.');
      break;
  }

  //x표를 눌렀을때
  const handleClose = () => {
    props.toggle();
    // setOpen(false);
  };

  const data: dataType = {
    empCode: '',
    hosu: '',
    afterChange: '',
    startDate: '',
    endDate: '',
    type: ''
  };

  // 인사발령 날짜와 휴직 종료 날짜를 숫자로 변환후 비교하는 함수
  const isValid = () => {
    const appointDate = appointmentDateRef.current!.value;
    const appointEndDate = appointmentEndDateRef.current?.value;
    console.log('typeof appointDate is :', typeof appointDate);
    console.log('length of appointDate is :', appointDate?.length);
    console.log('this is leave date', appointDate, appointEndDate);

    if (appointDate === undefined) {
      console.log('startYear is undefined');
      return;
    }
    const startYear = appointDate?.slice(0, 4);
    const startMonth = appointDate?.slice(5, 7);
    const startDate = appointDate?.slice(8, 10);
    const fullStartDate = parseInt(startYear + startMonth + startDate);
    console.log('startDate is :', fullStartDate);
    console.log('sliced date is :', startYear, startMonth, startDate);

    const endYear = appointEndDate?.slice(0, 4);
    const endMonth = appointEndDate?.slice(5, 7);
    const endDate = appointEndDate?.slice(8, 10);

    if (endYear === undefined) {
      console.log('endYear is undefined');
      return;
    }
    const fullEndDate = parseInt(endYear + endMonth + endDate);
    console.log('fullEndDate is :', fullEndDate);
    console.log(typeof fullEndDate);
    console.log(fullEndDate < fullStartDate ? ' endDate cannot earlier than startDate' : 'it is okay');
    return fullEndDate < fullStartDate;
  };

  const saveHandler = () => {
    console.log('save button clicked');
    const appointmentDateref = appointmentDateRef.current?.value;
    const appointmentEndDateref = appointmentEndDateRef.current?.value;

    if (appointmentType === '부서이동') {
      setPosition(-1);
    } else if (appointmentType === '승진') {
      setDept(-1);
    }

    if (appointmentType === '') {
      alert('인사발령구분을 선택해 주세요');
      return;
    } else if (appointmentDateref === '') {
      alert('인사발령 등록 날짜를 선택해 주세요');
      return;
    } else if (appointmentDateref !== '' && appointmentEndDateref === '') {
      alert('휴직 종료 날짜를 선택해 주세요');
      return;
    } else if (appointmentType === '부서이동' && deptCodeState === -1) {
      setPosition(-1);
      alert('변경된 부서를 선택해 주세요');
      return;
    } else if (appointmentType === '승진' && positionCodeState === -1) {
      setDept(-1);
      alert('승진된 직급을 선택해 주세요');
      return;
    } else if (appointmentType === '휴직' && appointmentEndDateref === '') {
      console.log('appoinementEndRef is no value');
      alert('휴직 종료 날짜를 선택해 주세요');
      return;
    } else if (appointmentDateref !== '' && appointmentEndDateref !== '') {
      const bool = isValid();
      if (bool) {
        alert('휴직 종료 날짜는 인사발령 날짜보다 빠를수 없습니다.');
        return;
      }
    }
    data.empCode = empCode;
    data.hosu = hosu;
    data.afterChange = appointmentType === '부서이동' ? deptCodeState : positionCodeState;
    data.startDate = appointmentDateref;
    data.endDate = appointmentEndDateref;
    data.type = selectedType;
    console.log('appointment data is :', data);
    dispatch(empAppointmentAction.REGISTER_EMP_APPOINTMENT_REQUESTED(data));
    props.toggle();
    return;
  };

  return (
    <Grid container justifyContent="flex-end">
      <Modal
        style={{ width: '400px', height: '500px', margin: 'auto' }}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {/* eslint-disable-next-line */}
        <Body
          modalStyle={{
            width: 700,
            height: 700
          }}
          style={{ border: '1px solid red' }}
          handleClose={handleClose}
          saveHandler={saveHandler}
          hosu={hosu}
          empCode={empCode}
          empname={empName}
          empNameref={empNameRef}
          deptChangeHandler={deptChangeHandler}
          deptcode={deptCode}
          defaultDeptname={defaultDeptName}
          positionChangeHandler={positionChangeHandler}
          positionCode={positionCode}
          defaultPositionName={defaultPositionName}
          typeChangeHandler={typeChangeHandler}
          selectedType={selectedType}
          appointmentDateRef={appointmentDateRef}
          appointmentEndDateRef={appointmentEndDateRef}
        />
      </Modal>
    </Grid>
  );
}

const Body = React.forwardRef(
  (
    {
      handleClose,
      saveHandler,
      empCode,
      hosu,
      empname,
      empNameref,
      deptChangeHandler,
      deptcode,
      defaultDeptname,
      positionChangeHandler,
      positionCode,
      defaultPositionName,
      typeChangeHandler,
      selectedType,
      appointmentDateRef,
      appointmentEndDateRef
    }: BodyProps,
    ref: React.Ref<HTMLDivElement>
  ) => (
    <div ref={ref} tabIndex={-1}>
      {/**
       * style={modalStyle}
       * Property 'style' does not exist on type 'IntrinsicAttributes & MainCardProps & RefAttributes<HTMLDivElement>
       */}
      <MainCard
        style={{
          width: 550,
          height: 500
        }}
        sx={{
          position: 'absolute',
          width: { xs: 500, lg: 700 },
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        title="인사발령상세"
        content={false}
        secondary={
          <IconButton onClick={handleClose} size="large">
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <CardContent>
          <DialogContent style={{ minWidth: 400, height: 300, margin: 'auto' }}>
            <Stack style={{ alignItems: 'center' }} spacing={3}>
              <Grid item sm={6} md={12}>
                <Grid container spacing={1}>
                  <Grid item md={6} xs={12}>
                    <InputLabel>호수</InputLabel>
                    <TextField value={hosu} aria-readonly={true} id="outlined-basic1" inputRef={empNameref} fullWidth />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <InputLabel>사원코드</InputLabel>
                    <TextField value={empCode} aria-readonly={true} id="outlined-basic1" fullWidth />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <InputLabel>사원명</InputLabel>
                    <TextField value={empname} aria-readonly={true} id="outlined-basic1" inputRef={empNameref} fullWidth />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel>인사발령구분</InputLabel>
                    <FormControl fullWidth>
                      <Select
                        defaultValue={''}
                        onChange={(e) => {
                          typeChangeHandler(e.target.value);
                        }}
                      >
                        <MenuItem hidden disabled value={''}>
                          <em>{'인사발령 타입을 선택해 주세요'}</em>
                        </MenuItem>
                        <MenuItem value={'부서이동'}>부서이동 </MenuItem>
                        <MenuItem value={'승진'}>승진</MenuItem>
                        <MenuItem value={'휴직'}>휴직</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {selectedType === '부서이동' && (
                    <Grid item xs={12} sm={6}>
                      <InputLabel>부서</InputLabel>
                      <FormControl fullWidth>
                        <Select
                          defaultValue={''}
                          onChange={(e) => {
                            deptChangeHandler(e.target.value);
                          }}
                        >
                          <MenuItem hidden disabled>
                            <em>{'이전부서 : ' + defaultDeptname}</em>
                          </MenuItem>
                          <MenuItem value={'회계팀'}>회계팀</MenuItem>
                          <MenuItem value={'인사팀'}>인사팀</MenuItem>
                          <MenuItem value={'전산팀'}>전산팀</MenuItem>
                          <MenuItem value={'보안팀'}>보안팀</MenuItem>
                          <MenuItem value={'개발팀'}>개발팀</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  )}

                  {selectedType === '승진' && (
                    <Grid item xs={12} sm={6}>
                      <InputLabel>직급</InputLabel>
                      <FormControl fullWidth>
                        <Select defaultValue={''} onChange={(e) => positionChangeHandler(e.target.value)}>
                          <MenuItem disabled value={positionCode}>
                            <em>{'이전 직급 ' + defaultPositionName}</em>
                          </MenuItem>
                          <MenuItem value={'인턴'}>인턴</MenuItem>
                          <MenuItem value={'사원'}>사원</MenuItem>
                          <MenuItem value={'대리'}>대리</MenuItem>
                          <MenuItem value={'팀장'}>팀장</MenuItem>
                          <MenuItem value={'부장'}>부장</MenuItem>
                          <MenuItem value={'상무'}>상무</MenuItem>
                          <MenuItem value={'대표이사'}>대표이사</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  )}

                  <Grid item md={6} xs={12}>
                    <InputLabel>등록일자</InputLabel>
                    <TextField id="outlined-basic14" inputRef={appointmentDateRef} fullWidth type="date" />
                  </Grid>
                  {selectedType === '휴직' && (
                    <Grid item md={6} xs={12}>
                      <InputLabel>종료날짜</InputLabel>
                      <TextField id="outlined-basic14" inputRef={appointmentEndDateRef} fullWidth type="date" />
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Stack>
          </DialogContent>
        </CardContent>

        <Button style={{ backgroundColor: 'inherit', transform: 'translateX(450px)' }} onClick={saveHandler}>
          {'등록'}
        </Button>
      </MainCard>
    </div>
  )
);
