import React from 'react';
import { storiesOf } from '@storybook/react';

import Breadcrumb from './index';

const stories = storiesOf('Breadcrumb', module);

stories.addWithInfo('basic', () => (
  <div>
    <Breadcrumb>
      <Breadcrumb.Item text="teste 1" url="test url"/>
      <Breadcrumb.Item text="teste 2"/>
    </Breadcrumb>

    <Breadcrumb>
      <Breadcrumb.Item text="teste 1" url="test url 1"/>
      <Breadcrumb.Item text="teste 2" url="test url 2"/>
      <Breadcrumb.Item text="teste 3"/>
    </Breadcrumb>
  </div>
));
