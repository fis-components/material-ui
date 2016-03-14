import React from 'react';
import pure from 'recompose/pure';
import SvgIcon from '../../svg-icon';

let CommunicationCallMissed = (props) => (
  <SvgIcon {...props}>
    <path d="M19.59 7L12 14.59 6.41 9H11V7H3v8h2v-4.59l7 7 9-9z"/>
  </SvgIcon>
);
CommunicationCallMissed = pure(CommunicationCallMissed)
CommunicationCallMissed.displayName = 'CommunicationCallMissed';

export default CommunicationCallMissed;