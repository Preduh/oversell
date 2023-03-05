import { Html, Head, Main, NextScript } from 'next/document'

export default function Document (): JSX.Element {
  return (
    <Html>
      <Head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta property="og:type" content="website" />
        <meta property="og:description" content="A forma mais simples de alavancar seu negócio." />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:url" content="https://oversell.com.br" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Oversell" />
        <meta property="og:image" content="https://www.oversell.com.br/oversell-social-media-preview.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
