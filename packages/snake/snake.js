console.log('Retro Snake Game initialized on ByteOS!');
if (typeof document !== 'undefined') document.title = 'Retro Snake — ByteOS';
localStorage.setItem('snake_highscore', '140');
console.log('Highscore loaded: ' + localStorage.getItem('snake_highscore'));
console.log('Starting snake game loop...');
