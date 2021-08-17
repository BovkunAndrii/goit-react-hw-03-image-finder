// Модули
import React, { Component } from 'react';

// Компоненты
import * as newsApi from './services/news-api';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal';
import GalleryLoader from './components/Loader';

// Стили
import styles from './App.module.css';

class App extends Component {
  state = {
    hits: [],
    currentPage: 1,
    currentPageImages: [],
    searchQuery: '',
    isLoading: false,
    error: null,
    showModal: false,
    url: '',
    tag: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchHits();
    }
    if (
      this.state.currentPage !== 2 &&
      prevState.currentPage !== this.state.currentPage
    ) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      hits: [],
      error: null,
      url: '',
      tag: '',
    });
  };

  fetchHits = () => {
    const { searchQuery, currentPage } = this.state;
    const options = { searchQuery, currentPage };
    this.setState({ isLoading: true });
    setTimeout(() => {
      newsApi
        .fetchHits(options)
        .then(hits => {
          this.setState(prevState => ({
            hits: [...prevState.hits, ...hits],
            currentPage: prevState.currentPage + 1,
            currentPageImages: [...hits],
          }));
          if (hits.length === 0) {
            this.setState({
              error: 'Nothing was find by your query. Try again.',
            });
          }
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ isLoading: false }));
    }, 500);
  };

  handleImageClick = ({ target }) => {
    if (target.nodeName !== 'IMG') {
      return;
    }
    const { url } = target.dataset;
    const tag = target.alt;
    this.setState({
      url,
      tag,
    });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { hits, isLoading, showModal, url, tag } = this.state;
    const shouldRenderLoadMoreButton = hits.length;
    return (
      <div className={styles.Container}>
        <Searchbar onSubmit={this.onChangeQuery} />

        <ImageGallery hits={hits} onClick={this.handleImageClick} />

        {isLoading && <GalleryLoader />}

        {shouldRenderLoadMoreButton > 11 && <Button onClick={this.fetchHits} />}

        {showModal && (
          <Modal onClose={this.toggleModal} onClick={this.handleImageClick}>
            <img src={url} alt={tag} />
          </Modal>
        )}
      </div>
    );
  }
}

export default App;
