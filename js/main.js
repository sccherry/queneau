(function() {
  'use strict';

  /**
   * Elements
   */

  const html = document.querySelector('html');
  const langForm = document.forms['lang'];
  const poem = document.querySelector('.Poem');


  /**
   * Utilities
   */

  const randomInteger = num => Math.floor( Math.random() * num );

  const pickLine = ( num, arr ) => arr[num][randomInteger(arr[num].length)];

  const toggleClass = ( newEl, parentEl, className ) => {
    const oldEl = parentEl.querySelector( `.${className}` );

    if ( oldEl ) {
      el.classList.remove( className );
    }

    newEl.classList.add( className );
  };

  const poemData = fetch('data/poem.json').then(res => res.json());

  /**
   * Set language
   */


  langForm.addEventListener('change', e => {
    const activeLang = e.target.value;

    toggleClass( e.target.parentElement, langForm, 'is-active' );

    html.setAttribute( 'lang', activeLang );
  });


  /**
   * Create poem
   */

  const createLine = line => {
    const li = document.createElement('li');

    Object.keys( line ).map(langcode => {
      const span = document.createElement('span');

      span.textContent = line[langcode];
      span.setAttribute('lang', langcode);

      return span;
    }).forEach(span => li.appendChild( span ));

    return li;
  };

  poemData.then(res => res.map(( curr, ind, arr ) => {
    return pickLine( ind, arr );
  })).then(lines => {
    lines.map( createLine ).forEach(li => poem.appendChild( li ));
  });


  /**
   * Update poem
   */

  setInterval(() => {
    poemData.then(data => {
      const index = randomInteger(data.length);
      const lines = poem.querySelectorAll('li');
      const newLi = createLine( pickLine( index, data ) );

      toggleClass( newLi, poem, 'is-changed' );
      poem.replaceChild( newLi, lines[index] );
    });
  }, 5000);
})();
