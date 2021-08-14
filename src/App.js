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
      .then(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  fetchHits = () => {
    const { searchQuery, currentPage } = this.state;
    const options = { searchQuery, currentPage };

    this.setState({ isLoading: true });

    newsApi
      .fetchHits(options)
      .then(hits => {
        this.setState(prevState => ({
          hits: [...prevState.hits, ...hits],
          currentPage: prevState.currentPage + 1,
        }));
        this.scrollDown();
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  scrollDown = () => {
    if (this.state.currentPage > 2) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
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
    const shouldRenderLoadMoreButton = hits.length > 0;

    return (
      <div className={styles.Container}>
        <Searchbar onSubmit={this.onChangeQuery} />

        <ImageGallery hits={hits} onClick={this.handleImageClick} />

        {isLoading && <GalleryLoader />}

        {shouldRenderLoadMoreButton > 0 && <Button onClick={this.fetchHits} />}

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
