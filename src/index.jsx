import * as $ from 'jquery'
import Post from '@models/Post'
import './styles/styles.css'
// import json from './assets/json'
import react from 'react'
import {createRoot} from 'react-dom/client'
import WebpackLogo from './assets/webpack-logo.png'
import './styles/less.less'
import './styles/scss.scss'
import './babel'

// import xml from './assets/data.xml'
// import csv from './assets/data.csv'
const post = new Post ('Webpack Post Title', WebpackLogo)
$('pre').addClass('code').html(post.toString())

const App = () => (    
<div className="container">
    <h1>Webpack course</h1>
    <hr />
    <div className="logo" />
    <hr/>
    <pre />
    <hr/>
    <div className="box">
        <h2>Less</h2>
    </div>
    <div className="card">
        <h2>SCSS</h2>
    </div>
</div>
)

const rootContainer = document.getElementById('app');
const root = createRoot(rootContainer);
root.render(<App />);

// console.log('Post to String', post.toString())

// console.log('JSON', json)
// console.log('XML', xml)
// console.log('CSV', csv)