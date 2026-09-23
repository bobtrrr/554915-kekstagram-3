import { RENDER_POSITION } from './const';
import { isEscKeydown } from './util';

const COMMENTS_COUNT_PER_STEP = 5;

const modal = document.querySelector('.big-picture');
const closeFullPhotoButton = modal.querySelector('.big-picture__cancel');
const photoImage = modal.querySelector('.big-picture__img img');
const photoDescription = modal.querySelector('.social__caption');
const likesCount = modal.querySelector('.likes-count');

const commentsList = modal.querySelector('.social__comments');
const commentsCount = modal.querySelector('.social__comment-count');
const commentsCountShown = commentsCount.querySelector('.social__comment-shown-count');
const commentsCountTotal = commentsCount.querySelector('.social__comment-total-count');
const loadMoreButton = modal.querySelector('.comments-loader');

let renderedCommentsCount = 0;

let slicedComments = null;

const setComments = (comments) => (slicedComments = comments.slice());

const isShowLoadMoreButton = () => slicedComments.length > COMMENTS_COUNT_PER_STEP;
const isHideLoadMoreButton = () => renderedCommentsCount >= slicedComments.length;

const hideLoadMoreButton = () => loadMoreButton.classList.add('hidden');
const showLoadMoreButton = () => loadMoreButton.classList.remove('hidden');

const getCommentsCount = () => slicedComments.length;
const updateShownCommentsCount = (count) => (commentsCountShown.textContent = count);

const getCommentTemplate = ({avatar, message, name}) => (
  `<li class="social__comment">
    <img
      class="social__picture"
      src="${avatar}"
      alt="${name}"
      width="35" height="35">
    <p class="social__text">${message}</p>
  </li>`
);

const renderComments = (from, to) => {
  const commentItems =
    slicedComments
      .slice(from, to)
      .map((comment) => getCommentTemplate(comment))
      .join('');

  commentsList.insertAdjacentHTML(RENDER_POSITION.BEFOREEND, commentItems);
};

const clearCommentsList = () => (commentsList.innerHTML = '');

const getNextRenderedCommentsCount = () => Math.min(slicedComments.length, renderedCommentsCount + COMMENTS_COUNT_PER_STEP);
const resetRenderedCommentsCount = () => (renderedCommentsCount = 0);
const updateRenderedCommentsCount = () => (renderedCommentsCount = getNextRenderedCommentsCount());

const loadMoreButtonClickHandler = () => {
  const nextCommentsCount = getNextRenderedCommentsCount();

  updateShownCommentsCount(nextCommentsCount);

  renderComments(renderedCommentsCount, nextCommentsCount);
  updateRenderedCommentsCount();

  if (isHideLoadMoreButton()) {
    hideLoadMoreButton();
  }
};

const renderCommentsCount = (shown) => {
  updateShownCommentsCount(shown);
  commentsCountTotal.textContent = getCommentsCount();
};

const renderFullPhoto = (url, description) => {
  photoImage.src = url;
  photoImage.alt = description;
  photoDescription.textContent = description;
};

const renderLikesCount = (likes) => {
  likesCount.textContent = likes;
};

const initFullPhoto = ({url, likes, description, comments}) => {
  setComments(comments);

  const nextCommentsCount = getNextRenderedCommentsCount();

  renderFullPhoto(url, description);
  renderLikesCount(likes);
  renderCommentsCount(nextCommentsCount);

  renderComments(0, nextCommentsCount);
  updateRenderedCommentsCount();

  loadMoreButton.addEventListener('click', loadMoreButtonClickHandler);

  if (isShowLoadMoreButton()) {
    showLoadMoreButton();
  }
};

const resetFullPhoto = () => {
  photoImage.src = '';
  photoImage.alt = '';
  photoDescription.textContent = '';
  likesCount.textContent = '';
  commentsCountTotal.textContent = '';
  resetRenderedCommentsCount();

  clearCommentsList();
  hideLoadMoreButton();

  loadMoreButton.removeEventListener('click', loadMoreButtonClickHandler);
};

const openFullPhoto = (photo) => {
  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  initFullPhoto(photo);

  document.addEventListener('keydown', documentEscKeydownHandler);
};

const closeFullPhoto = () => {
  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');

  resetFullPhoto();

  document.removeEventListener('keydown', documentEscKeydownHandler);
};

function documentEscKeydownHandler (evt) {
  if (isEscKeydown(evt)) {
    closeFullPhoto();
  }
}

closeFullPhotoButton.addEventListener('click', closeFullPhoto);

export {openFullPhoto};

