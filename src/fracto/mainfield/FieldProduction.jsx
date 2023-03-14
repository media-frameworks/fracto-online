import {Component} from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

import {CoolStyles} from 'common/ui/CoolImports';

const FieldWrapper = styled(CoolStyles.Block)`
   margin: 1rem;
`;

export class FieldProduction extends Component {

   static propTypes = {
      width_px: PropTypes.number.isRequired,
   }

   state = {
   };

   render(){
      return <FieldWrapper>{"FieldProduction"}</FieldWrapper>
   }
}

export default FieldProduction;
