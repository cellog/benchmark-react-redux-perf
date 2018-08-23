import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App as SimpleApp, ForwardApp } from './App';

//import {Provider} from "react-redux";
import Provider from './Provider'
import useForward from './env'

import {PerformanceMetadataMarker} from "performance-mark-metadata";
import FpsEmitter from "fps-emitter";
//const { PerformanceMetadataMarker } = require("performance-mark-metadata");
//const FpsEmitter = require("fps-emitter");

import configureStore from "./configureStore";

const App = useForward ? ForwardApp : SimpleApp

const marker = new PerformanceMetadataMarker();
window.marker = marker;

const fps = new FpsEmitter();
fps.on("update", function(FPS) {
    // mark current FPS
    marker.mark("FPS", {
        details: { FPS }
    });
});

const getFpsStats = () => {
    const logData = performance.getEntriesByType("mark").map(entry => {
        const meta = marker.getEntryMetadata(entry);
        return {
            type: entry.name,
            timeStamp: entry.startTime,
            meta: meta
        };
    });

    return logData;
}

window.getFpsStats = getFpsStats;


const store = configureStore();


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

