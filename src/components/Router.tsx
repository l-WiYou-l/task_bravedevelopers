import React, {useEffect, useState} from 'react';
import 'react-phone-input-2/lib/style.css'
import styled from 'styled-components';
import OperatorModal from "./Modal/OperatorModatl";
import {rejects} from "assert";


type TOperatorProps = {
  id: number;
  name: string;
  imageSrc: string;

}

type TRouterState = {
  operators: TOperatorProps[];
  loaded: boolean;
  data: any;
  isOpen: boolean;
  selectedOperator: TOperatorProps;
}

type TCardImgProps = {
  src: string;
  height: number;
  width: number;
}

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

const CardOperator = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: whitesmoke;
  margin: 20px;
  width: 500px;
  background-color: rgb(67,65,65);
  height: 300px;
  font-size: 90px;
  font-weight:700;
  border-radius: 20px;
`;
const ContainerOperators = styled.div`
  display: flex;
  flex-wrap: wrap;
  
`;

const operators: TOperatorProps[] = [
  {
    id: 1,
    name: 'Mts',
    imageSrc: 'https://tadviser.ru/images/b/bf/MTS_Logo_rus_2r.png',
  },
  {
    id: 2,
    name: 'Megaphone',
    imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/MegaFon_sign%2Blogo_horiz_green_RU_%28RGB%29.svg/2560px-MegaFon_sign%2Blogo_horiz_green_RU_%28RGB%29.svg.png',
  },
  {
    id: 3,
    name: 'Biline',
    imageSrc: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/BeeLine_logo.png'
  }
]


function Router() {
  const [state, setState] = useState<TRouterState>({
    operators,
    loaded: false,
    data:[],
    isOpen: false,
    selectedOperator: {
      id: 0,
      name: '',
      imageSrc: '',
    },
  });

  const OperatorLink = (operator: TOperatorProps) => (
    <CardOperator onClick={() => {setState({...state,isOpen: true,selectedOperator: operator})}}>
      <CardImg src={operator.imageSrc} width={500} height={180}></CardImg>
    </CardOperator>
  );

  const operatorsLink = state.operators.map(operator => (
    <OperatorLink
      key={operator.id}
      id={operator.id}
      name={operator.name}
      imageSrc={operator.imageSrc}
    />)
  )
  const handleModalClick = () => setState({...state, isOpen: false})
  return (
    <>
      <OperatorModal isOpen={state.isOpen} close={handleModalClick} operator={state.selectedOperator}/>
      <ContainerOperators >
        {operatorsLink}
      </ContainerOperators>
    </>
  );
}

export default Router;
