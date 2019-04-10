import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import { darken } from '@material-ui/core/styles/colorManipulator';

const themeInitialState = {
  paletteType: 'light',
  paletteColors: {
    primary: indigo,
    secondary: {
      main: darken(pink.A700, 0.08),
    },
  },
};

export default themeInitialState;
