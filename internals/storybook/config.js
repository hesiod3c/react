import React from 'react';
import infoAddon from '@storybook/addon-info';
import { configure, setAddon, addDecorator } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

addDecorator((fn, { kind, story }) => <div>
  <header>
    <h1>{kind}</h1>
    <h2>{story}</h2>
  </header>
  <div>
    {fn()}
  </div>
  <div>
    Click the "?" mark at top-right to view the info.
  </div>
</div>);

setOptions({
  name: 'UI React',
  url: '',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  showSearchBox: false,
  downPanelInRight: true
});
setAddon(infoAddon);

function loadStories () {
  const req = require.context('../../source/', true, /\.story\.js$/);
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module);
