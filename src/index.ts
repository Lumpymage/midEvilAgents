//provide opening code to prove the display works
import { Display } from './display.js';


const display = new Display(document.querySelector('canvas'));
display.drawRectangle(0, 0, 10, 10, 'red');