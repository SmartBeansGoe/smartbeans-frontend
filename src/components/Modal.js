import PropTypes from 'prop-types';

export const Modal = ({
  children,
  closeModal,
  modalState,
  title,
  width,
  height,
  footer,
  clearInput,
}) => {
  if (!modalState) {
    return null;
  }

  let close = () => {
    if (clearInput !== undefined)
      clearInput();
    closeModal();
  }

  return (
    <div
      className="modal is-active"
      style={{
        width: '100%',
      }}
    >
      <div className="modal-background" onClick={close} />
      <div
        className="modal-card"
        style={{
          minwidth: 350,
          width: width !== undefined ? width : '90%',
          height: height !== undefined ? height : '90%',
        }}
      >
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
          <button className="delete" onClick={close} />
        </header>
        <section className="modal-card-body">
          <div className="content">{children}</div>
        </section>
        {footer}
      </div>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  modalState: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  width: PropTypes.any,
  height: PropTypes.any,
  footer: PropTypes.node,
  clearInput: PropTypes.func,
};
