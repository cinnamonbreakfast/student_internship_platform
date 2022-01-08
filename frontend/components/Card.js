import {Row, Col, Panel, active, setActive, Nav, Home} from 'rsuite';


const Card = props => (
    <Panel shaded bordered style={{ display: 'inline-block', width: 240 }}>
        <img src="https://via.placeholder.com/240x240" height="200" />
        <Panel header="Nume firma">
        <p>
            <small>
            Short description of the internship
            </small>
        </p>
        </Panel>
        </Panel>
  );


export default Card;



