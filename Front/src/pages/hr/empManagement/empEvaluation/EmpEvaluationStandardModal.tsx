import React from 'react';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from '@mui/material';
import Image from 'next/image';
import EmpEvaluationStandard from '../../../../../public/assets/images/standard-table2.png';
// ===============================|| UI DIALOG - FORMS ||=============================== //

// 코드가 긴 관계로 각각의 입력값에 따른 유효성 검사 로직은 작성하지 않았습니다.
export default function EmpEvalutaionStandardModal() {
  const theme = useTheme();

  const [open, setOpen] = React.useState<boolean>(false);

  const handleClose = () => {
    setOpen((data) => !data);
  };

  const handleClickOpen = () => {
    setOpen((data) => !data);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        고과 기준표
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth={'lg'}
        sx={{ margin: 'auto' }}
        scroll={'paper'}
        classes={{ paperWidthLg: '100px' }}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {open && (
          <>
            <Box>
              <DialogTitle id="form-dialog-title">사원고과 기준표</DialogTitle>
              <DialogContent>
                {/* fill에 빨간줄이 뜨는데 이거 없어도 되는지를 봐야겠다. */}
                <Image fill={true} src={EmpEvaluationStandard} alt="image not found" />
              </DialogContent>
              <DialogActions sx={{ pr: 2.5, transform: 'translateX(-380px)' }}>
                <Button sx={{ color: theme.palette.error.dark, right: -300 }} onClick={handleClose} color="secondary">
                  닫기
                </Button>
              </DialogActions>
            </Box>
          </>
        )}
      </Dialog>
    </div>
  );
}
