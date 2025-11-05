export const KEYBOARD_SHORTCUTS = {
  playback: {
    togglePlay: ['space', 'k'],
    rewind10s: ['j'],
    forward10s: ['l'],
    rewind5s: ['left'],
    forward5s: ['right'],
    frameBack: [','],
    frameForward: ['.'],
  },
  lyrics: {
    addTimestamp: ['enter'],
    navigateUp: ['up'],
    navigateDown: ['down'],
  },
  speed: {
    slower: ['shift+,'],
    faster: ['shift+.'],
  },
  general: {
    help: ['shift+/'],
    save: ['mod+s'],
    undo: ['mod+z'],
    redo: ['mod+shift+z'],
  },
};

export const SHORTCUT_DESCRIPTIONS = {
  'space, k': 'Play/Pause',
  j: 'Rewind 10 seconds',
  l: 'Forward 10 seconds',
  left: 'Rewind 5 seconds',
  right: 'Forward 5 seconds',
  ',': 'Frame backward',
  '.': 'Frame forward',
  enter: 'Mark timestamp',
  up: 'Navigate up in lyrics',
  down: 'Navigate down in lyrics',
  'shift+,': 'Decrease speed',
  'shift+.': 'Increase speed',
  'shift+/': 'Show keyboard shortcuts',
  'mod+s': 'Export LRC file',
  'mod+z': 'Undo',
  'mod+shift+z': 'Redo',
};
