interface themeInterface {
  light: colorsInterface,
  dark: colorsInterface,
}

interface colorsInterface {
  primary: String,
  secondary: String,
  background: String
}



export const colors: themeInterface = {
  light: {
    primary: '#0f1923',
    secondary: '#ff4655',
    background: '#ece8e1'
  },
  dark: {
    primary: '#ece8e1',
    secondary: '#ff4655',
    background: '#0f1923'
  }
}