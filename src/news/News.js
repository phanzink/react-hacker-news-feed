import React, { Component } from 'react';

import Story from './Story';
import { newStoriesUrl, storyUrl } from './util';

import axios from 'axios';
import { List, InfiniteLoader, AutoSizer } from 'react-virtualized';

import './assets/styles/styles.scss';

class News extends Component {
  state = {
    loading: false,
    articleIds: [],
    articleIdsCount: 0,
    articles: [],
    loaded: false,
    loadedRowCount: 0,
    loadedRowsMap: {},
    loadingRowCount: 0,
  };

  componentDidMount () {
    this.gatherTopStories();
  }

  gatherTopStories () {
    const getStoryIds = async () => {
      const result = await axios.get(newStoriesUrl);
      return result.data;
    };

    getStoryIds().then(data => {
      this.setState({
        articleIds: data,
        articleIdsCount: data.length,
        loaded: true,
      });
      //get the first articles
      data.slice(0, 30).map(id => this.gatherArticles(id));
    });
  }

  gatherArticles (articleId) {
    //we need to grab each one because of bad api design
    if (articleId) {
      const getStory = async articleId => {
        const result = await axios.get(`${storyUrl + articleId}.json`);

        return result.data;
      };

      getStory(articleId).then(data => {
        this.setState(prevState => ({
          articles: prevState.articles.concat(data),
          loaded: true,
        }));
      });
    }
  }

  loadMoreArticles ({ startIndex, stopIndex }) {
    if (startIndex >= 30) {
      const { articleIds } = this.state;
      articleIds
        .slice(startIndex, stopIndex)
        .map(id => this.gatherArticles(id));
    }
  }

  rowRenderer = ({ index, parent, key, style }) => {
    const { articles } = this.state;
    const article = articles[index];

    return (
      <Story
        key={key}
        style={style}
        by={article.by}
        title={article.title}
        url={article.url}
        time={article.time}
      />
    );
  };

  isRowLoaded = ({ index }) => {
    return !!this.state.articles[index];
  };

  render () {
    const { articleIdsCount, loaded, articles } = this.state;

    if (!loaded) {
      return <div className='container hacker-load'>Gathering News...</div>;
    }

    return (
      <div className='container'>
        <InfiniteLoader
          isRowLoaded={this.isRowLoaded}
          loadMoreRows={this.loadMoreArticles.bind(this)}
          rowCount={articleIdsCount}
          threshold={30}
        >
          {({ onRowsRendered, registerChild }) => (
            <AutoSizer>
              {({ width, height }) => (
                <List
                  rowCount={articles.length}
                  width={width}
                  height={height}
                  rowHeight={90}
                  rowRenderer={this.rowRenderer.bind(this)}
                  overscanRowCount={5}
                  onRowsRendered={onRowsRendered}
                />
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>
      </div>
    );
  }
}

export default News;
