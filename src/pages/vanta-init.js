import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';

export function initVanta() {
  return NET({
    el: '#vanta-bg',
    THREE: THREE,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0xc0abab,
    backgroundColor: 0x151539,
    spacing: 16.00,
    showDots: false
  });
}


