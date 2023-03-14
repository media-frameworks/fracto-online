import {Component} from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

import {CoolStyles} from 'common/ui/CoolImports';
import PlatformHeader from './mainfield/PlatformHeader';

import FieldStaging from './mainfield/FieldStaging';
import FieldProduction from './mainfield/FieldProduction';
import {
   FIELD_TYPE_STAGING,
   FIELD_TYPE_PRODUCTION
} from "./SidebarPlatforms";

const PlatformField = styled(CoolStyles.Block)`
   ${CoolStyles.fixed}
   top: 76px;
   right: 0;
   bottom: 0;
   overflow: auto;
   background-color: white;
}`

export class MainFieldPlatforms extends Component {

   static propTypes = {
      platform_specifier: PropTypes.string.isRequired,
      width_px: PropTypes.number.isRequired,
   }

   state = {};

   componentDidMount() {
      console.log("this.props", this.props)
   }

   render_field = () => {
      const {width_px, platform_specifier} = this.props;
      switch (platform_specifier) {
         case FIELD_TYPE_STAGING:
            return <FieldStaging width_px={width_px}/>
         case FIELD_TYPE_PRODUCTION:
            return <FieldProduction width_px={width_px}/>
         default:
            console.log("unknown platform", platform_specifier)
            break;
      }
      return []
   }

   render() {
      const {platform_specifier, width_px} = this.props;
      const field_rendering = this.render_field()
      const field_style = {width: `${width_px}px`}
      return [
         <PlatformHeader
            key={'MainFieldPlatforms-PlatformHeader'}
            platform_specifier={platform_specifier}
            width_px={width_px}/>,
         <PlatformField
            key={`MainFieldPlatforms-PlatformField`}
            style={field_style}>
            {field_rendering}
         </PlatformField>
      ];
   }
}

export default MainFieldPlatforms;
