interface SwitchCaseProps<Case extends PropertyKey> {
  value: Case | null | undefined;
  cases: Record<Case, React.ReactNode>;
  defaultComponent?: React.ReactNode;
}

/**
 * SwitchCase 컴포넌트
 *
 * @description value값에 따라 다른 컴포넌트를 `Switch`형태로 조건부 렌더링하는 컴포넌트
 *
 * @param {SwitchCaseProps<Case>} props - 컴포넌트에 전달되는 props
 * @param {Case | null | undefined} props.value - 현재 선택된 값
 * @param {Record<Case, React.ReactNode>} props.cases - 각 케이스에 해당하는 컴포넌트들
 * @param {React.ReactNode} [props.defaultComponent] - value가 null 또는 undefined
 *
 * @returns {JSX.Element} - 조건에 맞는 컴포넌트를 렌더링합니다.
 *
 * @example
 * ```tsx
 * <SwitchCase
 *   value={currentCase}
 *   cases={{
 *     case1: <Component1 />,
 *     case2: <Component2 />,
 *   }}
 *   defaultComponent={<DefaultComponent />}
 * />
 * ```
 */
const SwitchCase = <Case extends PropertyKey>({
  value,
  cases,
  defaultComponent = null,
}: SwitchCaseProps<Case>) => {
  if (value === null || value === undefined) {
    return <>{defaultComponent}</>;
  }

  return <>{cases[value] || defaultComponent}</>;
};

export default SwitchCase;
