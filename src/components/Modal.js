import classes from "./Modal.module.css";

const Modal = (props) => {
  let preparedClassName = `${classes.modalInfo}`
  if ((props.children.props.children.includes('wrong')))
    preparedClassName = `${classes.modalInfo} ${classes.error}`
  return <div className={preparedClassName}>
    {props.children}</div>;
};

export default Modal;
