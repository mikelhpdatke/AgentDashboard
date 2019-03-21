export = Animate;
declare class Animate {
  static isAnimate: boolean;
  constructor(props: any);
  componentDidMount(): void;
  componentDidUpdate(): void;
  componentWillReceiveProps(nextProps: any): void;
  forceUpdate(callback: any): void;
  isValidChildByKey(currentChildren: any, key: any): any;
  render(): any;
  setState(partialState: any, callback: any): void;
  stop(key: any): void;
}
declare namespace Animate {
  namespace defaultProps {
    const animation: {};
    const component: string;
    const componentProps: {};
    function onAppear(): void;
    function onEnd(): void;
    function onEnter(): void;
    function onLeave(): void;
    const transitionAppear: boolean;
    const transitionEnter: boolean;
    const transitionLeave: boolean;
  }
  namespace propTypes {
    function animation(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace animation {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function children(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace children {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function component(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace component {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function componentProps(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace componentProps {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function exclusive(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace exclusive {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function onAppear(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace onAppear {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function onEnd(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace onEnd {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function onEnter(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace onEnter {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function onLeave(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace onLeave {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function showProp(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace showProp {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function transitionAppear(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace transitionAppear {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function transitionEnter(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace transitionEnter {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function transitionLeave(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace transitionLeave {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
    function transitionName(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    namespace transitionName {
      function isRequired(p0: any, p1: any, p2: any, p3: any, p4: any, p5: any): any;
    }
  }
}
