import React, {Component} from 'react';
import PropTypes from 'prop-types';
// import styled from "styled-components";
//
// import {CoolStyles} from 'common/ui/CoolImports';

import AppPageMain from 'common/app/AppPageMain';

import SidebarPlatforms, {FIELD_TYPE_STAGING} from 'fracto/SidebarPlatforms';
import MainFieldPlatforms from 'fracto/MainFieldPlatforms';

export class PageMain extends Component {

   static propTypes = {
      app_name: PropTypes.string.isRequired,
   }

   state = {
      left_width: 0,
      right_width: 0,
      platform_specifier: null
   };

   componentDidMount() {
      const platform_specifier = localStorage.getItem("platform_specifier")
      this.setState({
         platform_specifier: platform_specifier ? platform_specifier : FIELD_TYPE_STAGING,
      })
   }

   on_resize = (left_width, right_width) => {
      this.setState({
         left_width: left_width,
         right_width: right_width
      })
   }

   on_platform_specify = (platform_specifier) => {
      localStorage.setItem("platform_specifier", platform_specifier);
      this.setState({platform_specifier: platform_specifier})
   }

   render_content_left = (width_px) => {
      const {platform_specifier} = this.state;
      return [
         <SidebarPlatforms
            key={"PageMain-SidebarPlatforms"}
            width_px={width_px}
            platform_specifier={platform_specifier}
            on_platform_specify={platform_specifier => this.on_platform_specify(platform_specifier)}
         />
      ]
   }

   render_content_right = (width_px) => {
      const {platform_specifier} = this.state
      if (!platform_specifier) {
         return "no platform"
      }
      return [
         <MainFieldPlatforms
            key={"PageMain-MainFieldPlatform"}
            width_px={width_px}
            platform_specifier={platform_specifier}
         />
      ]
   }

   render() {
      const {left_width, right_width} = this.state;
      const {app_name} = this.props;
      const content_left = this.render_content_left(left_width);
      const content_right = this.render_content_right(right_width);
      return <AppPageMain
         app_name={app_name}
         on_resize={(left_width, right_width) => this.on_resize(left_width, right_width)}
         content_left={content_left}
         content_right={content_right}
      />
   }
}

export default PageMain;
