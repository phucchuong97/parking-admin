export const getDuringTimeFromNow = t => {
  const time = new Date(t);
  const now = new Date();
  let during = Math.floor((now - time) / 60000);
  if (during < 2) {
    return 'Just now';
  }
  if (during < 60) {
    return during + ' minutes ago';
  }
  during = Math.floor(during / 60);
  if (during < 24) {
    return during + (during > 1 ? ' hours ago' : ' hour ago');
  }
  during = Math.floor(during / 24);
  if (during <= 30) {
    return during + (during > 1 ? ' days ago' : ' day ago');
  }
  during = Math.floor(during / 30);
  if (during <= 12) {
    return during + (during > 1 ? ' months ago' : ' month ago');
  }
  during = Math.floor(during / 365);
  return during + (during > 1 ? ' years ago' : ' year ago');
};
