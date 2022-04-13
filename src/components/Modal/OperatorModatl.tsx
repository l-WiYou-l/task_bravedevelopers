import React, {useEffect, useState, useRef} from "react";
import PhoneInput from "react-phone-input-2";
import styled from "styled-components";

type TCardImgProps = {
  src: string;
  height: number;
  width: number;
}

type TModalContentProps = {
  ref: any;
  height: number;
  width: number;
}

type TRouterState = {
  phoneValue: string;
  inputValue: number;
}
type TSumInputProps = {
  value: number;
  onChange: (value:string) => void;
}

const Modal = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  display: block ;
  justify-content: center;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
  z-index: 0;
`

const ModalContent = styled.div<TModalContentProps>`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    background-color: rgb(67,65,65);
    border: 2px solid rgb(0, 0, 0);
    box-shadow: rgb(0 0 0 / 20%) 0px 11px 15px -7px, rgb(0 0 0 / 14%) 0px 24px 38px 3px, rgb(0 0 0 / 12%) 0px 9px 46px 8px;
    padding: 32px;
    display: flex;
    height: ${props => props.height ? props.height : 500}px;
    width: ${props => props.width ? props.width : 500}px;
    flex-direction: column;
    align-items: center;
    z-index: 1;
    border-radius: 20px;
`;
const CardImg = styled.div<TCardImgProps>`
  display: flex;
  align-items: center;
  background-image: url(${props => props.src});
  background-size: contain;
  background-repeat: no-repeat;
  height: ${props => props.height}px;
  width: ${props => props.width}px;
  justify-content: center;
  background-position-x: center;
`;
const Button = styled.button`
    background-color: black;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin-left: 65%;
    border-radius: 5px;
    position: absolute;
    right: 0;
    margin-top: 19px;
    cursor: pointer;
    &:active {
      transition: all 0.9s ease 0s;
      background-color: #191919;
  }
`;



const SumInput = (props:TSumInputProps) => {
  return (
    <input value={props.value} onChange={(event) => props.onChange(event.currentTarget.value)}/>
  )
}


const OperatorModal = ({isOpen, close, operator}:any) => {
  const [state, setState] = useState<TRouterState>({
    phoneValue: '',
    inputValue: 1,
  });
  const handleSumInputChange = (value:string) => {
    const numberReg = /(?![0]).*^[0-9]*[.,]?[0-9]+$/g;
    const inputValueNumber = Number(value)
    if(numberReg.test(value) && (inputValueNumber <= 1000)){

      setState({...state, inputValue: inputValueNumber})
    }
  }
  const contentRef = useRef()

  useEffect(() => {
    if(!isOpen) return

    function listener(evt:any) {
      // @ts-ignore
      if(contentRef.current.contains(evt.target)) return;
      close();
    }
    window.addEventListener('click', listener)
    return () => window.removeEventListener('click', listener)
  },[isOpen])

  const handleSubmit = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Успех в половине случаев.
        if (Math.random() < .5) {
          resolve([close(), alert("Операция выполнена успешно")])
        } else {
          reject(alert("Операция не выполнена"))
        }
      },1000)

    })
  }

  if (!isOpen) return null;


  return (
    <div>
      <Modal >
        <ModalContent ref={contentRef} height={350} width={500} >
          <CardImg src={operator.imageSrc} height={180} width={500}></CardImg>
          <div  className='close' onClick={close}></div>
          <div className='modal__content'>
            <div className='modal__content-input'>
              <SumInput onChange={handleSumInputChange} value={state.inputValue}/><span>₽</span>
            </div>
            <PhoneInput
              country={'ru'}
              value={state.phoneValue}
              onChange={phone => { setState({...state, phoneValue: phone})}}
            />
            <Button onClick={handleSubmit} >Оплатить</Button>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
}
export default OperatorModal;
