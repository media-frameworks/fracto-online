import {Component} from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

import {CoolStyles} from 'common/ui/CoolImports';

export const FIELD_TYPE_STAGING = "staging";
export const FIELD_TYPE_PRODUCTION = "production";

export const ALL_FIELD_TYPES = [
   FIELD_TYPE_STAGING,
   FIELD_TYPE_PRODUCTION,
]

const FieldTypeWrapper = styled(CoolStyles.Block)`
   margin: 0.5rem 1rem 0;
`;

const FieldTypeName = styled(CoolStyles.InlineBlock)`
   ${CoolStyles.uppercase}
   ${CoolStyles.align_middle}
   ${CoolStyles.pointer}
   font-size: 1.125rem;
   color: #666666;
   line-height: 1.25rem;
`;

const Dot = styled(CoolStyles.InlineBlock)`
   ${CoolStyles.align_middle}
   ${CoolStyles.pointer}
   height: 0.5rem;
   width: 0.5rem;
   border-radius: 0.25rem;
   background-color: #888888;
   cursor: pointer;
   line-height: 1.25rem;
   margin-right: 0.5rem;
`;

const Not = styled(CoolStyles.InlineBlock)`
   height: 0.5rem;
   width: 1rem;
   line-height: 1.25rem;
`;

const SidebarWrapper = styled(CoolStyles.Block)`
   margin-top: 1rem;
`;

export class SidebarPlatforms extends Component {

   static propTypes = {
      width_px: PropTypes.number.isRequired,
      platform_specifier: PropTypes.string.isRequired,
      on_platform_specify: PropTypes.func.isRequired,
   }

   state = {};

   select_field = (field_type) => {
      const {on_platform_specify} = this.props;
      const most_recent = on_platform_specify(field_type);
      console.log("most_recent", field_type, most_recent)
   }

   render() {
      const {platform_specifier} = this.props;
      const sidebar_list = ALL_FIELD_TYPES.map(field_type => {
         const is_selected =platform_specifier === field_type
         const marker = is_selected ? <Dot/> : <Not/>
         const extra_style = is_selected ? {fontWeight: 'bold'}:{}
         return <FieldTypeWrapper
            onClick={e => this.select_field(field_type)}>
            {marker}
            <FieldTypeName style={extra_style}>{field_type}</FieldTypeName>
         </FieldTypeWrapper>
      })
      return <SidebarWrapper>
         {sidebar_list}
      </SidebarWrapper>;
   }
}

export default SidebarPlatforms;
