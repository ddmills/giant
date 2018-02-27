import {h} from 'preact';
import Icon from './Icon';
import SteamLogo from '../../images/steam-logo.svg';

export default class SteamIcon extends Icon {
  constructor() {
    super();
    this.svg = SteamLogo;
  }
}
