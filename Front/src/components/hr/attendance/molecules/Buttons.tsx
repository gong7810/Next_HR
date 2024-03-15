import React from 'react';
import MyButton from '../atoms/MyButton';
import { ButtonsProps } from '../types/types';

const Buttons = ({ buttonsInfo }: ButtonsProps) => {
  return (
    <>
      
      {buttonsInfo.map((button, idx) => (
        <MyButton
          key={idx} // Provide a unique key for each button
          variant={button.variant}
          color={button.color}
          onClick={button.onClick}
          className={button.className}
          inputText={button.inputText}
        />
      ))}
      {/* &nbsp;&nbsp;
      <MyButton variant="contained" color={color[idx]} onClick={update} className="button" inputText="수정" />
      &nbsp;&nbsp;
      <MyButton variant="contained" color="#D1B2FF" onClick={selectSearchEmpChange} className="button" inputText="성과급계산" />
      &nbsp;&nbsp;
      <MyButton variant="contained" color="#5F00FF" onClick={selectSearchEmpChange} className="button" inputText="저장" />
      &nbsp;&nbsp;
      <MyButton variant="contained" color="#5F00FF" onClick={selectSearchEmpChange} className="button" inputText="등록" /> */}
      {/* <ThemeProvider theme={theme}>
      <Button variant={variant} onClick={onClick} className={className}>
        {inputText}
      </Button>
    </ThemeProvider> */}
    </>
  );
};

export default Buttons;
