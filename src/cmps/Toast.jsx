import PropTypes from 'prop-types';
export default function Toast({toast}) {
  Toast.propTypes = {
    toast: PropTypes.object.isRequired,
  };
  const toastIcon = toast.type === 'error'
    ? 'fas fa-exclamation-triangle'
    : 'far fa-check-circle';

  return (
    <section className={`toast-container flex align-center ${toast.type}`}>
      <span className="toast-icon"><i className={toastIcon} /></span>
      <section className="toast-msg flex column">
        <span>{toast.msg}</span>
      </section>
    </section>
  );
}
