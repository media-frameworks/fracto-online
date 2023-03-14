import {Component} from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

// import Flickr from 'flickr-sdk';
// import FLICKR_AUTH from 'admin/flickr_auth';

import {CoolStyles} from 'common/ui/CoolImports';

const FieldWrapper = styled(CoolStyles.Block)`
   margin: 1rem;
`;

const FRACTO_PHP_URL_BASE = "http://dev.mikehallstudio.com/fracto/fracto-server";

const MIN_LEVEL = 2;
const MAX_LEVEL = 6;

export class FieldStaging extends Component {

   static propTypes = {
      width_px: PropTypes.number.isRequired,
   }

   state = {
      tiles_data: {}
   };

   componentDidMount() {
      const url = `${FRACTO_PHP_URL_BASE}/content.php?filename=tiles.json`;
      fetch(url)
         .then(response => response.json())
         .then(tiles_data => {
            console.log("tiles_data", tiles_data)
            this.initialize(tiles_data)
         })
   }

   initialize = (tiles_data) => {
      let must_save = false;
      for (let level = MIN_LEVEL; level <= MAX_LEVEL; level++) {
         const level_key = `level-${level}`
         if (!tiles_data[level_key]) {
            tiles_data[level_key] = {name: `Level ${level}`}
            must_save = true;
         }
         if (!tiles_data[level_key].level) {
            tiles_data[level_key].level = level
            must_save = true;
         }
      }
      if (must_save) {
         console.log("saving tiles_data now", tiles_data)
         const url = `${FRACTO_PHP_URL_BASE}/content.php`;
         const data = {
            post_data: tiles_data,
            filename: "tiles.json"
         }
         fetch(url, {
            body: JSON.stringify(data), // data you send.
            headers: {'Content-Type': 'application/json; charset=UTF-8'},
            method: 'POST',
         }).then(function (response) {
            if (response.body) {
               return response.json();
            }
            return ["fail"];
         }).then(function (json) {
            const post_data = json.content.post_data;
            console.log(`initialize post_data`, post_data);
         });
      }
      this.setState({tiles_data: tiles_data});
   }

   render() {
      const {tiles_data} = this.state;
      return <FieldWrapper>{"FieldStaging"}</FieldWrapper>
   }
}

export default FieldStaging;
