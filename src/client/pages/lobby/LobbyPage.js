import {h, Component} from 'preact';
import BasicPage from '../layout/BasicPage';
import Subheader from '../../components/subheader/Subheader';

export default class LobbyPage extends Component {
  render({id}) {
    console.log('lobby', id);
    return (
      <BasicPage>
        <Subheader description="Yall rdy?">Game lobby</Subheader>
      </BasicPage>
    );
  }
};

