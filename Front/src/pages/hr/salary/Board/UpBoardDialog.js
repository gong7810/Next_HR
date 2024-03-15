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

const UpBoardDialog = ({ setOpenCompanyUpDialog, update, maintitle, content, upBoard, handleChangeTitle }) => {
  return (
    <>
      <div>
        <Typography>게시판 글</Typography>
      </div>

      <div align="center">
        <div>
          <h4>제목</h4>
          <TextField id="first" value={maintitle} onChange={handleChangeTitle} />
        </div>
        <div>
          <h4>내용</h4>
          <textarea id="second" value={content} onChange={handleChangeTitle} />
          {/* <TextField id="costTxf" variant="outlined" /> */}
        </div>
        <div>
          <Button onClick={upBoard}>수정</Button>
        </div>
      </div>
    </>
  );
};

export default UpBoardDialog;
