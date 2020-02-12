import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const init = () => configure({ adapter: new Adapter() });

export default {
    init
};