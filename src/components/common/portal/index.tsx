import React from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';

const KEYCODES = {
  ESCAPE: 27
};

export interface Props {
  className?: string;
  onClose?: () => void;
  onOpen?: () => void;
  isOpen?: boolean;
  destroyOnClose?: boolean;
  closeOnEsc?: boolean;
  closeOnOutsideClick?: boolean;
  portalTrigger?: any; // 打开portal的触发按钮ref，用于判断 closeOnOutsideClick 点击
}

interface State {
  active: boolean;
  closeOnOutsideClick: boolean;
}

export default class Portal extends React.Component<Props, State> {
  outsideMouseClickEvent = false;
  node: HTMLElement;

  static defaultProps = {
    className: null,
    onClose: () => {},
    onOpen: () => {},
    isOpen: false,
    destroyOnClose: true,
    closeOnOutsideClick: false,
    closeOnEsc: false
  };

  constructor(props) {
    super(props);
    this.node = null;
    this.state = {
      active: props.isOpen,
      closeOnOutsideClick: props.closeOnOutsideClick
    };
    this.openPortal = this.openPortal.bind(this);
    this.closePortal = this.closePortal.bind(this);
    this.handleOutsideMouseClick = this.handleOutsideMouseClick.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  componentDidMount() {
    if (this.props.closeOnEsc) {
      document.addEventListener('keydown', this.handleKeydown);
    }
    if (this.props.closeOnOutsideClick) {
      this.toggleOutsideMouseClickEvent();
    }
  }

  static getDerivedStateFromProps(nextProps, state) {
    if (nextProps.closeOnOutsideClick !== state.closeOnOutsideClick) {
      // this.toggleOutsideMouseClickEvent();
    }

    if (nextProps.isOpen !== state.active) {
      return {
        // ...state,
        active: nextProps.isOpen
      };
    }
    if (nextProps.closeOnOutsideClick !== state.closeOnOutsideClick) {
      return {
        // ...state,
        closeOnOutsideClick: nextProps.closeOnOutsideClick
      };
    }
    // Return null to indicate no change to state.
    return null;
  }

  componentWillUnmount() {
    if (this.props.closeOnEsc) {
      document.removeEventListener('keydown', this.handleKeydown);
    }
    if (this.props.closeOnOutsideClick) {
      this.toggleOutsideMouseClickEvent();
    }
    this.removeNode();
  }

  toggleOutsideMouseClickEvent() {
    if (!this.outsideMouseClickEvent) {
      this.outsideMouseClickEvent = true;
      document.addEventListener('click', this.handleOutsideMouseClick);
    } else {
      this.outsideMouseClickEvent = false;
      document.removeEventListener('click', this.handleOutsideMouseClick);
    }
  }

  openPortal(e) {
    if (this.state.active) {
      return;
    }
    if (e && e.nativeEvent) {
      e.nativeEvent.stopImmediatePropagation();
    }
    this.setState({ active: true }, this.props.onOpen);
  }

  closePortal() {
    if (!this.state.active) {
      return;
    }
    this.setState({ active: false }, this.props.onClose);
    if (this.props.destroyOnClose) {
      this.removeNode();
    }
  }

  createNode() {
    //
    if (!this.node) {
      const { className } = this.props;
      this.node = document.createElement('div');

      if (className) {
        this.node.className = className;
      }
      document.body.appendChild(this.node);
    }
    return ReactDOM.createPortal(this.props.children, this.node);
  }

  removeNode() {
    //
    if (this.node) {
      document.body.removeChild(this.node);
    }
    this.node = null;
    return null;
  }

  handleOutsideMouseClick(e) {
    if (!this.state.active) {
      return;
    }
    const root = this.node;
    const { portalTrigger } = this.props;
    if (
      !root ||
      root.contains(e.target) ||
      (e.button && e.button !== 0) ||
      (portalTrigger && findDOMNode(portalTrigger).contains(e.target))
    ) {
      return;
    }
    // console.log('e.target ==== ', e.target);
    this.closePortal();
  }

  handleKeydown(e) {
    if (e.keyCode === KEYCODES.ESCAPE && this.state.active) {
      this.closePortal();
    }
  }

  render() {
    const { active } = this.state;
    return active ? this.createNode() : this.removeNode();
  }
}
