
import Document, { Head, Main, NextScript } from 'next/document'
// import common from '../public/styles/common.scss'
export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const { html, head, errorHtml, chunks } = renderPage()
    // const styles = flush()
    return { html, head, errorHtml, chunks }
  }

  render () {
    return (
      <html>
        <style jsx global>{`
        .root,
        #__next,.custom_class {
            min-height: 100%;
            max-height: 100%;
            height: 100%;
            overflow: hidden;
            background:#f8f8f8;
        }
        
        [data-reactroot] {
            min-height: 100%;
            max-height: 100%;
            height: 100%;    
        }
        .ant-layout-header{
            h1{
                display: inline-block;
                margin-left: 50px;
                img{
                    width: 114px;height: 35px;vertical-align: middle;
                }
            }
            h3{
                display: inline-block;
                margin-left: 40px;
                font-size: 20px;
                color:#0499d9;
                position: absolute;bottom: 7px;line-height: initial
            }
            .custom-trigger{
                position: absolute;
                margin-left: 36px;
                display: inline-block;
                font-size: 20px;
                bottom: 15px;
                cursor: pointer
            }
        }`}</style>
        <Head>
          <style>{`body { margin: 0 } /* custom! */`}</style>
       
          <link rel='stylesheet' href='/static/styles/nprogress.css' />
        </Head>
        <body className='custom_class'>
          {this.props.customValue}
          <Main className={'root'} />
          <NextScript />
        </body>
      </html>
    )
  }
}
