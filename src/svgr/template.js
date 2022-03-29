const template = (variables, { tpl }) => {
  return tpl`
${variables.imports};
${"\n"}
${variables.interfaces};
${"\n"}
export const ${variables.componentName.replace("Svg", "")} = (${variables.props}) => (
  ${variables.jsx}
);
 `;
};

module.exports = template;
