import { useEffect, useRef, useState, ReactElement, useCallback } from 'react';

// material-ui
import { Button, Dialog, TextField, Theme, useMediaQuery } from '@mui/material';

// third-party
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import timelinePlugin from '@fullcalendar/timeline';
import { DateSelectArg, EventClickArg, EventDropArg } from '@fullcalendar/core';
import interactionPlugin, { EventResizeDoneArg } from '@fullcalendar/interaction';

import { FormikValues } from 'formik';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import Toolbar from 'components/application/calendar/Toolbar';
import AddEventForm from 'components/application/calendar/AddEventForm';
import CalendarStyled from 'components/application/calendar/CalendarStyled';

import Loader from 'ui-component/Loader';
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';

import { useDispatch, useSelector } from 'store';
import { getEvents, addEvent, updateEvent, removeEvent } from 'store/slices/calendar';

// assets
import AddAlarmTwoToneIcon from '@mui/icons-material/AddAlarmTwoTone';

// types
import { DateRange } from 'types';

import Modal from './Modal'
import { requestInsertHoliday } from 'store/slices/hr/base/holiday';
import { HolidayTO } from '../types/types';
import Minicalendal from './Minicalendar';
import Minicalendar from './Minicalendar';

// ==============================|| APPLICATION CALENDAR ||============================== //

const Calendar = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const calendarRef = useRef<FullCalendar>(null);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [miniOpen,setMiniOpen]=useState(false);

  // fetch events data
  const [events, setEvents] = useState<FormikValues[]>([]);
  const calendarState = useSelector((state) => state.calendar.holidayList.holidayList);
  // console.log("달력1",calendarState) //값이 잘나오지만 사용하면 계속 콘솔에 찍힘.찍지마셈

  const fullCalendarEvents = calendarState?.map((Item:any) => {
    return {
      title: Item.holidayName,
      start: new Date(Item.applyDay), // 데이터 포맷에 따라 날짜 객체로 변환
      end: new Date(Item.applyDay),   // 데이터 포맷에 따라 날짜 객체로 변환
      description: Item.note,
      allDay: true, // 날짜가 종일 이벤트인 경우 true로 설정
    };
  });

  
  const [newHoliday, setNewHoliday] = useState<HolidayTO>({
    applyDay: '', 
    holidayName: '', 
    note: '', 
    status: 'insert',
  });




  useEffect(() => {
    dispatch(getEvents()).then(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setEvents(fullCalendarEvents);
    ;
  }, [calendarState]);
  //useEffect(() => {
  //   setEvents(fullCalendarEvents);
  //   ;
  // }, [fullCalendarEvents]); 이상태로 쓰면 무한루프에 빠져버려~~

  const modalOpen=()=>{
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null); // 모달이 닫힐 때 selectedEvent를 null로 설정
    setNewHoliday({
      applyDay: '',
      holidayName: '',
      note: '',
      status: 'insert',
    });
  };

  const dataSelect = (arg) => {
    if (!isModalOpen) {
      setIsModalOpen(true);
      const selectedEventData = arg.event;
      setSelectedEvent(selectedEventData);
    }
  };

  // const calendarOpen=()=>{
  //   setMiniOpen(true);
  //   console.log("야호")
  //   console.log(miniOpen)
  // }
  
  if (loading) return <Loader />;

  return (
    <Page title="Calendar">
      <MainCard
        title="Holiday Calendar"
      >
        <CalendarStyled>
          <SubCard>
          <FullCalendar 
            ref={calendarRef}
            initialView="dayGridMonth" 
            eventResizableFromStart
            eventClick={dataSelect}
            plugins={[ dayGridPlugin ]}
            events={events}
            headerToolbar={{
              left: 'myCustomButton today', // "today" 버튼과 사용자 정의 버튼을 동일한 라인에 표시 버튼추가할려면 customButtons에 추가하고 여기도 추가할것.
              center: 'title',
              right: 'prev,next',
            }}
            customButtons={{
              myCustomButton: {
                text: '추가',
                click: modalOpen,
              },
              // mini: { // "mini" 버튼을 추가
              //   text: 'mini', // 버튼의 텍스트
              //   click: calendarOpen, // "mini" 버튼을 클릭할 때 실행할 함수
              // },
            }}
            />
          </SubCard>
        </CalendarStyled>

        {/* Dialog renders its body even if not open */}
        <Dialog maxWidth="sm"   open={isModalOpen}  sx={{ '& .MuiDialog-paper': { p: 0 } }}
         PaperProps={{style: {  maxWidth: '800px', width: '100%',height:'500px',display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}}>
        {isModalOpen && (
          <Modal events={events} closeModal={closeModal} selectedEvent={selectedEvent} setNewHoliday={setNewHoliday} newHoliday={newHoliday}></Modal>
        )}
        </Dialog>
        {/* {miniOpen && (
          <Minicalendar miniOpen={miniOpen}>{console.log('Minicalendar is being rendered')}</Minicalendar>
        )} */}
      </MainCard>
    </Page>
  );
};

Calendar.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Calendar;

