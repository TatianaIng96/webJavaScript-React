import React from 'react';
import PropTypes from 'prop-types';


//style
import { Wraper,Image } from './Actor.styles';

const Actor = ({name,character,imageUrl}) => (
    <Wraper>
        <Image src={imageUrl} alt='actor-thumb'/>
        <h3>{name}</h3>
        <p>{character}</p>
    </Wraper>
);

Actor.propTypes={
    name:PropTypes.string,
    character:PropTypes.string,
    imageUrl: PropTypes.string
};

export default Actor;
