import React, { Component } from 'react';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import {
  XYPlot,
  XAxis,
  YAxis,
  MarkSeries,
  LabelSeries,
  GradientDefs
} from 'react-vis';
import ShowcaseButton from './showcase-button';
import _ from 'lodash';
import './App.css';

import jsonData from './g.json';
import getData from './google';

async function generateData(info, keyword) {
  return await getData(info, keyword);
}

const randomNumber = (s, e, r) => {
  return (Math.floor(Math.random() * e) + s) * r;
};

const MODE = ['noWobble', 'gentle', 'wobbly', 'stiff'];

class App extends Component {
  state = {
    currentQuery: 'Paracel Islands',
    info: 'interestByRegion',
    data: []
    // _
    // .orderBy(
    //   jsonData.map(d => {
    //     return {
    //       x: randomNumber(2, 17, 1),
    //       y: randomNumber(2, 25, 1),
    //       label: d.id,
    //       size: d.value * 3,
    //       opacity: Math.random(),
    //       style: { fontSize: d.value * 3 < 20 ? 10 : 14 },
    //       rotation: d.value * 3 < 20 ? 45 : 0
    //     };
    //   }),
    //   ['size'],
    //   ['desc']
    // )
    // .slice(1, 20)
  };

  async componentDidMount() {
    await this.updateData(this.state.currentQuery);
  }

  organizeData = data => {
    return _
      .orderBy(
        data
          .map(d => {
            return {
              x: randomNumber(2, 17, 1),
              y: randomNumber(2, 25, 1),
              label: d.id,
              size: d.value * 3,
              opacity: Math.random(),
              style: {
                fontSize: d.value * 3 < 20 ? 9 : 14
              },
              rotation: d.value * 3 < 20 ? 45 : 0
            };
          })
          .filter(d => d.size !== 0),
        ['size'],
        ['desc']
      )
      .slice(1, 25);
  };

  valueSelect = async event => {
    await this.updateData(event.label);
  };

  queryChanging = event => {
    this.setState({
      currentQuery: event.target.value
    });
  };

  changeCurrentQuery = async () => {
    await this.updateData(this.state.currentQuery);
  };

  async updateData(keyword) {
    const rawData = await generateData(this.state.info, keyword);
    const newData = this.organizeData(rawData);
    console.log(newData);
    this.setState({ data: newData, currentQuery: keyword });
  }

  updateQueriedInfo = info => {
    this.setState({
      info
    });
  };

  render() {
    const { data } = this.state;
    return (
      <div className="App">
        <div>
          <h3>Google Trend Visualization</h3>
        </div>
        <div
          style={{
            width: '40vw',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginBottom: '14px'
          }}
        >
          <div
            style={{
              color: '#363636',
              marginRight: '10px'
            }}
          >
            Keyword
          </div>
          <input
            style={{
              border: '0px',
              borderRadius: '3px',
              background: '#dfdfdf',
              padding: '10px 10px'
            }}
            placeholder="Current Keyword"
            type="text"
            onChange={this.queryChanging}
            value={this.state.currentQuery}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '40vw'
          }}
        >
          <div
            style={{
              color: '#363636'
            }}
          >
            Select mode
          </div>
          <div
            className="container"
            onClick={() => this.updateQueriedInfo('relatedTopics')}
          >
            <div className={`checkmark`}>
              {this.state.info === 'relatedTopics' && (
                <div className="checkmarkChecked" />
              )}
            </div>
            <div className="checked"> Related Topics </div>
          </div>
          <div
            className="container"
            onClick={() => this.updateQueriedInfo('relatedQueries')}
          >
            <div className={`checkmark`}>
              {this.state.info === 'relatedQueries' && (
                <div className="checkmarkChecked" />
              )}
            </div>
            <div className="checked"> Related Queries </div>
          </div>
          <div
            className="container"
            onClick={() => this.updateQueriedInfo('interestByRegion')}
          >
            <div className={`checkmark`}>
              {this.state.info === 'interestByRegion' && (
                <div className="checkmarkChecked" />
              )}
            </div>
            <div className="checked"> Interest By Region </div>
          </div>
          <button
            style={{
              border: '0px',
              borderRadius: '3px',
              background: '#0078D7',
              padding: '10px 10px',
              margin: '14px 10px',
              color: 'white'
            }}
            onClick={this.changeCurrentQuery}
          >
            Refetch information
          </button>
        </div>
        <XYPlot width={1200} height={500} yDomain={[0, 30]} xDomain={[1, 20]}>
          <GradientDefs>
            <linearGradient id="CoolGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="red" stopOpacity={0.4} />
              <stop offset="100%" stopColor="blue" stopOpacity={0.3} />
            </linearGradient>
          </GradientDefs>
          <XAxis />
          <YAxis />
          <MarkSeries
            sizeRange={[5, 50]}
            onValueClick={this.valueSelect}
            color={'url(#CoolGradient)'}
            animation={MODE[0]}
            className="mark-series-example"
            data={data}
          />
          <LabelSeries animation allowOffsetToBeReversed data={data} />
        </XYPlot>
      </div>
    );
  }
}

export default App;
