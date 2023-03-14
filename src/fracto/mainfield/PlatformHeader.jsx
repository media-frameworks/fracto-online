import {Component} from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

import {CoolStyles} from 'common/ui/CoolImports';

const TitleBar = styled(CoolStyles.Block)`
   background: linear-gradient(120deg, white, #999999);
   height: 72px;
   width: 100%;
   overflow-x: noscroll;
`;

const PlatformTitle = styled(CoolStyles.InlineBlock)`
   ${CoolStyles.uppercase}
   ${CoolStyles.bold}
   ${CoolStyles.align_center}
   letter-spacing: 0.25rem;
   font-size: 1.75rem;
   line-height: 46px;
   padding: 0.25rem 0.5rem;
   background-color: white;
   height: 46px;
   color: #444444;
`;

export class PlatformHeader extends Component {

   static propTypes = {
      width_px: PropTypes.number.isRequired,
      platform_specifier: PropTypes.string.isRequired,
   }

   state = {};

   componentDidMount() {
      console.log("this.props", this.props)
   }

   render() {
      const {platform_specifier} = this.props;
      return [
         <TitleBar>
            <PlatformTitle>{platform_specifier}</PlatformTitle>
         </TitleBar>
      ];
   }
}

export default PlatformHeader;
