import PropTypes from 'prop-types';

export const Modal = ({ children, closeModal, modalState, title }) => {
  if (!modalState) {
    return null;
  }

  return (
    <div
      className="modal is-active"
      style={{
        width: '100%',
      }}
    >
      <div className="modal-background" onClick={closeModal} />
      <div
        className="modal-card"
        style={{
          width: '90%',
          height: '90%',
        }}
      >
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button className="delete" onClick={closeModal} />
        </header>
        <section className="modal-card-body">
          <div className="content">{children}</div>
        </section>
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalState: PropTypes.bool.isRequired,
  title: PropTypes.string,
};