const template = (variables, { tpl }) => {
  return tpl`
${variables.imports};

${variables.interfaces};

export const ${variables.componentName} = (${variables.props}) => (
  ${variables.jsx}
);
 `;
};

module.exports = template;
