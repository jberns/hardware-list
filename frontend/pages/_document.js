import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { extractStyles } from 'evergreen-ui';

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    //Collect styles for styled-components
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />),
    );
    const styleTags = sheet.getStyleElement();

    //Collect styles from Evergreen
    const { css, hydrationScript } = extractStyles();
    return { ...page, styleTags, css, hydrationScript };
  }

  render() {
    const { css, hydrationScript } = this.props;
    return (
      <html>
        <Head>
          {this.props.styleTags}
          <style dangerouslySetInnerHTML={{ __html: css }} />
        </Head>
        <body>
          <Main />
          {hydrationScript}
          <NextScript />
        </body>
      </html>
    );
  }
}
