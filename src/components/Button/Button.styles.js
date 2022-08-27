import styled from 'styled-components';

export const Wrapper=styled.div`
display: block;
background: var(--darkGrey);
width: 20%;
min-width: 200px;
height: 60px;
border-radius: 30px;
color: var(--white);
border: 0;
font-size: 28px;
margin: 20px auto;
transition: all 0.3s;
outline: none;
cursor: pointer;
text-align: center;
align-items: center;
justify-content: center;
:hover {
    opacity: 0.8;
} 
`;

//export const Content=styled.div``;