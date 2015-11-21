import React from 'react';
import ReactDOM from 'react-dom/server';
import DocumentMeta from 'react-document-meta';
// <script src={ assets.javascript.main } charSet="UTF-8" />
export default (props) => {
  const { assets, component } = props;
  const content = component ? ReactDOM.renderToString(component) : '';

  return (
    <html lang="en-us">
      <head>
        { DocumentMeta.renderAsReact() }
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={ { __html: content } } />

      </body>
    </html>
  );
};
