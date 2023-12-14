// 对react属性 运行时类型检查
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { useContext, useMemo } from 'react';

export const DEFAULT_BREAKPOINTS = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
export const DEFAULT_MIN_BREAKPOINT = 'xs';

export interface ThemeContextValue {
  // An object mapping of Bootstrap component classes that map to a custom class.
  prefixes: Record<string, string>;
  // 您的应用程序支持的断点数组。默认为标准 Bootstrap 断点。
  breakpoints: string[];
  // 您的应用程序使用的最小断点。默认为最小的标准 Bootstrap 断点。
  minBreakpoint?: string;
  // 指示应用程序文本的方向性。使用 rtl 将文本设置为“从右到左”。
  dir?: string;
}

export interface ThemeProviderProps extends Partial<ThemeContextValue> {
  children: React.ReactNode;
}

// 使用 createContext 创建组件能够提供与读取的 上下文（context）。
const ThemeContext = React.createContext<ThemeContextValue>({
  prefixes: {},
  breakpoints: DEFAULT_BREAKPOINTS,
  minBreakpoint: DEFAULT_MIN_BREAKPOINT,
});
const { Consumer, Provider } = ThemeContext;

function ThemeProvider(
  {
    prefixes = {},
    breakpoints = DEFAULT_BREAKPOINTS,
    minBreakpoint = DEFAULT_MIN_BREAKPOINT,
    dir,
    children,
  }: ThemeProviderProps,
) {

  const contextValue = useMemo(
    () => ({
      prefixes: { ...prefixes },
      breakpoints,
      minBreakpoint,
      dir,
    }),
    [prefixes, breakpoints, minBreakpoint, dir],
  );

  return <Provider value={contextValue}>{children}</Provider>;
}

// 运行时类型检查
ThemeProvider.propTypes = {
  /**
   * An object mapping of Bootstrap component classes that
   * map to a custom class.
   *
   * **Note: Changing prefixes is an escape hatch and generally
   * shouldn't be used.**
   *
   * For more information, see [here](/getting-started/theming/#prefixing-components).
   */
  prefixes: PropTypes.object,

  /**
   * An array of breakpoints that your application supports.
   * Defaults to the standard Bootstrap breakpoints.
   */
  breakpoints: PropTypes.arrayOf(PropTypes.string),

  /**
   * The minimum breakpoint used by your application.
   * Defaults to the smallest of the standard Bootstrap breakpoints.
   */
  minBreakpoint: PropTypes.string,

  /**
   * Indicates the directionality of the application's text.
   *
   * Use `rtl` to set text as "right to left".
   */
  dir: PropTypes.string,
} as any;

// 导出 useContext(ThemeContext) 的快捷方法

export function useBootstrapPrefix(
  prefix: string | undefined,
  defaultPrefix: string,
): string {
  const { prefixes } = useContext(ThemeContext);
  return prefix || prefixes[defaultPrefix] || defaultPrefix;
}

export function useBootstrapBreakpoints() {
  const { breakpoints } = useContext(ThemeContext);
  return breakpoints;
}

export function useBootstrapMinBreakpoint() {
  const { minBreakpoint } = useContext(ThemeContext);
  return minBreakpoint;
}

export function useIsRTL() {
  const { dir } = useContext(ThemeContext);
  return dir === 'rtl';
}

// TODO
function createBootstrapComponent(Component, opts) {
  if (typeof opts === 'string') opts = { prefix: opts };
  // 是否是类组件
  const isClassy = Component.prototype && Component.prototype.isReactComponent;
  // If it's a functional component make sure we don't break it with a ref
  const { prefix, forwardRefAs = isClassy ? 'ref' : 'innerRef' } = opts;

  // forwardRef 让您的组件使用 ref 向父组件公开 DOM 节点。
  // props：父组件传递的props。
  // ref：父组件传递的ref属性。 ref 可以是对象或函数。如果父组件未传递 ref，则该引用将为 null。
  //    您应该将收到的引用传递给另一个组件，或者将其传递给 useImperativeHandle。
  // forwardRef 返回一个可以在 JSX 中渲染的 React 组件。
  // 与定义为普通函数的 React 组件不同，forwardRef 返回的组件能够接受 ref 属性。
  const Wrapped = React.forwardRef<any, { bsPrefix?: string }>(
    ({ ...props }, ref) => {
      props[forwardRefAs] = ref;
      const bsPrefix = useBootstrapPrefix((props as any).bsPrefix, prefix);
      return <Component {...props} bsPrefix={bsPrefix} />;
    },
  );

  Wrapped.displayName = `Bootstrap(${Component.displayName || Component.name})`;
  return Wrapped;
}

// as 导出时设置别名
export { createBootstrapComponent, Consumer as ThemeConsumer };

export default ThemeProvider;
