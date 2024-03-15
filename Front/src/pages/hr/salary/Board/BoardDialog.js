import { TextField } from '@material-ui/core';
import Axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import MyGrid from 'util/LogiUtil/MyGrid';
import { width } from '@mui/system';
import { Button } from '@mui/material';
import axios from 'axios';
import BoardContainer from './BoardContainer';

const BoardDialog = 
({
    setOpenCompanyDialog,
    handleChangeTitle,
    maintitle,
    content,
    saveBoard
}) => {
 //   const [title, settitle] = useState([]);
    //const [content, setcontent] = useState([]);
   // const { onClose,setonClose } = useState(false);


    //저장 살려야함
 /*   const saveBoard = () => {
      console.log('title 상태값='+title)
      console.log('content 상태값='+content)
      //Axios.post('http://localhost:8282/hr/salary/board', { params: { title,content }, })
      
      axios.post(
        'http://localhost:8282/hr/salary/board',
        {
        
        'title':title, 
        'content':content
    }
        )
      .then(response => {

          //console.log(response.errorMsg);
          console.log("성민게시판 디비 성공 값은 위에");
        //   console.log(response.data);
        //   console.log("성민2");
        //   console.log(response.data.baseInsureList);

       //   dispatch({
           //   type: 'insureList',
           //   payload: response.data.baseInsureList
         // });
          //dispatch(insureList(response.data));

          setOpenCompanyDialog(false);
         
      })
      .catch(e => {
          alert("글 등록이 불가능해요");
          console.log('post실패했어요');
      });
}; */

// 유즈콜백 쓰는거
 /*   const handleChangeTitle = useCallback(
        e => {
            if(e.target.id==='first')
           settitle(e.target.value);
            else
            setcontent(e.target.value);
        }        
    );
 */


// props => {
//     const [itemCost, setItemCost] = useState(null);
//     const [total, setTotal] = useState(null);
//     const [itemAmount, setItemAmount] = useState(null);

//     const useStyles = makeStyles(theme => ({
//         root: {
//             flexGrow: 1
//         },
//         title: {
//             flexGrow: 1,
//             marginLeft: '3vw',
//             marginTop: 'calc(6vh - 4vh)',
//             height: '6vh',
//             fontSize: '3vh'
//         },
//         btn: {
//             flexGrow: 1,
//             marginBottom: '1vh',
//             marginTop: '1vh'
//         },
//         appBar: {
//             flexGrow: 1,
//             width: '100%',
//             height: '10vh'
//         },
//         text: {
//             flexGrow: 1,
//             fontSize: '3vh'
//         },
//         float: {
//             float: 'left'
//         }
//     }));

//     useEffect(() => {
//         props.handleSearchItemCode();
//     }, []);

//     const handleChangeTotal = useCallback(
//         e => {
//             setItemAmount(e.target.value);
//             setTotal(e.target.value * props.itemCost);
//         },
//         [itemCost, props]
//     );

//     const handleConfirmAmount = params => {
//         var row = props.gridApiEstimateDetail.getSelectedRows();
//         row[0].estimateAmount = itemAmount;
//         row[0].unitPriceOfEstimate = props.itemCost;
//         row[0].sumPriceOfEstimate = total;

//         console.log(row);
//         props.gridApiEstimateDetail.updateRowData({ update: row });
//         props.close();
//     };

    return (
        <>
            <div>
                    <Typography>게시판 등록</Typography>
            </div>

            <div align="center">
                <div>
                    <h4>제목</h4>
                    <TextField 
                    id='first' 
                    value={maintitle} 
                    placeholder="제목을 입력해 주세요." 
                    onChange={handleChangeTitle}
                    />
                </div>
                <div>
                    <h4>내용</h4> 
                    <textarea id='second'
                     value={content} 
                      placeholder="내용을 입력해 주세요."  
                      onChange={handleChangeTitle}
                      />
                    {/* <TextField id="costTxf" variant="outlined" /> */}
                </div>

                <div>
                <Button onClick={saveBoard}>저장</Button>
                </div>
               
            </div>
        
        </>
    
    
    );
};

export default BoardDialog;
