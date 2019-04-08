import 'src/modules/components/bootstrap';
import React from 'react';
import MarkdownDocs from 'src/modules/components/MarkdownDocs';

const req = require.context('src/pages/premium-themes', false, /\.(md|js|tsx)$/);
const reqSource = require.context(
  '!raw-loader!../src/pages/premium-themes',
  false,
  /\.(js|tsx)$/,
);
const reqPrefix = 'pages/premium-themes';

function Page() {
  return <MarkdownDocs disableAd req={req} reqSource={reqSource} reqPrefix={reqPrefix} />;
}

export default Page;
