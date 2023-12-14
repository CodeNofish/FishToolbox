import React, { useMemo } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { mapToCssModules, tagPropType } from "./utils";
import { AccordionContext } from "./AccordionContext";


const propTypes = {
  children: PropTypes.node,
  /** Add custom class 添加自定义类 */
  className: PropTypes.string,
  /** Change existing className with a new className 使用新的 className 更改现有的 className */
  cssModule: PropTypes.object,
  /** Render accordions edge-to-edge with their parent container 使用父容器对齐 */
  flush: PropTypes.bool,
  //
  innerRef: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.func,
  ]),
  /** The current active key that corresponds to the currently expanded card 当前打开的选项卡  */
  open: PropTypes.oneOfType([PropTypes.array, PropTypes.string]).isRequired,
  /** Set a custom element for this component   */
  tag: tagPropType,
  /** Function that's triggered on clicking `AccordionHeader` 点击AccordionHeader时的回调 */
  toggle: PropTypes.func.isRequired,
};

function Accordion(props) {
  const {
    flush,
    open,
    toggle,
    className,
    cssModule,
    tag: Tag = "div",
    innerRef,
    ...attributes
  } = props;

  const classes = mapToCssModules(
    classNames(className, 'accordion', {
      'accordion-flush': flush,
    }),
    cssModule,
  );

  const accordionContext = useMemo(() => ({
    open,
    toggle,
  }));

  return (
    <AccordionContext.Provider value={accordionContext}>
      <Tag {...attributes} className={classes} ref={innerRef} />
    </AccordionContext.Provider>
  );
}

Accordion.propTypes = propTypes;

export default Accordion;
