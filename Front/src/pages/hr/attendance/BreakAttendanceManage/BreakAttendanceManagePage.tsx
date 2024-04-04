import { ReactElement, useState } from 'react';

// material-ui
import { Autocomplete, Button, Divider, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import GridTable, { rows as Data, columns } from 'components/forms/tables/GridTable';

// assets
import axios from 'axios';
import { AnnualLeaveMgtTO } from '../types/types';

// autocomplete options
const top100Films = [
    { label: '2023년 1월', id: 1 },
    { label: '2023년 2월', id: 2 },
    { label: '2023년 3월', id: 3 },
    { label: '2023년 4월', id: 4 },
    { label: '2023년 5월', id: 5 },
    { label: '2023년 6월', id: 6 },
    { label: '2023년 7월', id: 7 },
    { label: '2023년 8월', id: 8 },
    { label: '2023년 9월', id: 9 },
    { label: '2023년 10월', id: 10 },
    { label: '2023년 11월', id: 11 },
    { label: '2023년 12월', id: 12 }
];

// ==============================|| AUTOCOMPLETE ||============================== //

const BreakAttendanceManagePage = () => {

    const [selectedValue, setSelectedValue] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [selectedRow, setSelectedRow] = useState<AnnualLeaveMgtTO[]>([]);

    const handleAutocompleteChange = (event:any, newValue:any) => {
        console.log("data11", newValue.label)
        setSelectedValue(newValue.label);

    }

    const searchRest = () => {
        console.log("data", selectedValue);
        const formattedDate = selectedValue.replace(/[^\d]/g, '');
        console.log("data1", formattedDate);
        axios.get('http://localhost:9101/attdappvl/annual-leaveMgt', {
            params: {
                applyYearMonth: formattedDate
            }
        })
            .then((response) => {
                // 요청이 성공했을 때 실행되는 부분
                console.log("Response Data:", response.data.annualVacationMgtList
                );
                setTableData(response.data.annualVacationMgtList);
                // 여기에서 데이터를 사용할 수 있습니다.
            })
            .catch((error) => {
                // 요청이 실패했을 때 실행되는 부분
                console.error("Error:", error);
            });
    }

    const closeBreak = () => {
        console.log("선택", selectedRow);

        const updatedSelectedRow = selectedRow.map((row) => {
            // 현재 row를 복사하고 'finalizeStatus'를 'y'로 설정합니다.
            return { ...row, finalizeStatus: 'Y' };
        });
        console.log("선택1", updatedSelectedRow);

        const request = {
            sendData: updatedSelectedRow,
        };

        axios
            .put('http://localhost:9101/attdappvl/annual-leaveMgt/1', request, {
                headers: {
                    'Content-Type': 'application/json', // 요청 헤더에 JSON 형식임을 명시
                },
            })
            .then((response) => {
                // 요청이 성공했을 때 실행되는 부분
                console.log("Response Data:", response.data);
            })
            .catch((error) => {
                // 요청이 실패했을 때 실행되는 부분
                console.error("Error:", error);
            });
    };


    return (
        <Page title="연차관리">
            <MainCard title="연차관리"
                secondary={
                    <Stack direction="row" spacing={2} alignItems="center">
                    </Stack>
                }>
                <Grid container spacing={gridSpacing} justifyContent="center">
                    <Grid item xs={12} md={6} lg={4}>
                        <Grid container direction="column" spacing={3}>
                            <Grid item alignItems="center" justifyContent="center">
                                <Autocomplete
                                    disablePortal
                                    options={top100Films}
                                    // value={selectedValue}
                                    onChange={handleAutocompleteChange}
                                    renderInput={(params) => <TextField {...params} label="검색날짜" variant="outlined" />}
                                />
                            </Grid>
                            <Grid item style={{ textAlign: 'center' }}>
                                <Button
                                    variant="contained" onClick={searchRest}
                                >
                                    연차 내역 조회
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={gridSpacing} justifyContent="left">
                    <Grid item xs={12} md={6} lg={4}>
                        <Grid container direction="column" spacing={3}>
                            <Grid item style={{ textAlign: 'left' }}>
                                {/* <Button
                                    variant="contained" onClick={closeBreak}
                                >마감하기</Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button
                                    variant="contained"
                                >마감취소</Button> */}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                </Grid>
                <Grid>
                    {/* table data grid */}
                    <GridTable data={tableData} />
                </Grid>
            </MainCard>
        </Page>
    );
};

BreakAttendanceManagePage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>;
};

export default BreakAttendanceManagePage;
