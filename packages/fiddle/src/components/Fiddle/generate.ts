type Transpiler = import('@builder.io/mitosis').Transpiler<string>;

export const generateCode = async ({
  output,
  options,
  vueVersion,
}: {
  output: string;
  options: any;
  vueVersion: '2' | '3';
}): Promise<Transpiler> => {
  const mitosisCore = await import('@builder.io/mitosis');

  const {
    compileAwayBuilderComponents,
    mapStyles,
    componentToLiquid,
    componentToAlpine,
    componentToHtml,
    componentToCustomElement,
    componentToPreact,
    componentToLit,
    componentToRsc,
    componentToQwik,
    componentToReact,
    componentToStencil,
    componentToMarko,
    componentToSwift,
    componentToReactNative,
    componentToTemplate,
    componentToSolid,
    componentToAngular,
    componentToSvelte,
    componentToMitosis,
    componentToBuilder,
    componentToVue2,
    componentToVue3,
  } = mitosisCore;

  const plugins = [
    compileAwayBuilderComponents(),
    mapStyles({
      map: (styles) => ({
        ...styles,
        boxSizing: undefined,
        flexShrink: undefined,
        alignItems: styles.alignItems === 'stretch' ? undefined : styles.alignItems,
      }),
    }),
  ];
  const allOptions = { plugins, ...options };
  switch (output) {
    case 'liquid':
      return componentToLiquid(allOptions);
    case 'alpine':
      return componentToAlpine(allOptions);
    case 'html':
      return componentToHtml(allOptions);
    case 'webcomponents':
      return componentToCustomElement(allOptions);
    case 'preact':
      return componentToPreact(allOptions);
    case 'lit':
      return componentToLit(allOptions);
    case 'rsc':
      return componentToRsc(allOptions);
    case 'qwik':
      return (args) =>
        componentToQwik(allOptions)(args)
          // Remove the comment at the
          .replace('// GENERATED BY MITOSIS', '')
          .trim();
    case 'react':
      return componentToReact(allOptions);
    case 'stencil':
      return componentToStencil(allOptions);
    case 'marko':
      return componentToMarko(allOptions);
    case 'swift':
      return componentToSwift();
    case 'reactNative':
      return componentToReactNative(allOptions);
    case 'template':
      return componentToTemplate(allOptions);
    case 'solid':
      return componentToSolid(allOptions);
    case 'angular':
      return componentToAngular(allOptions);
    case 'svelte':
      return componentToSvelte(allOptions);
    case 'mitosis':
      return componentToMitosis();
    case 'json':
      return ({ component }) => JSON.stringify(component, null, 2);
    case 'builder':
      return (args) => JSON.stringify(componentToBuilder()(args), null, 2);
    case 'vue':
      return vueVersion === '2' ? componentToVue2(allOptions) : componentToVue3(allOptions);
    default:
      throw new Error('unexpected Output ' + output);
  }
};
