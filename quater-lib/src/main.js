
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const components = require.context(
    './components',
    false,
    /[A-Z]\w+\.(vue|js)$/
  );

export default {
  install (Vue) {
    components.keys().forEach(component =>
    {
        const componentElement = components(component);
        const componentName = upperFirst(
            camelCase(
                component
                .split('/')
                .pop()
                .replace(/\.\w+$/, '')
            ))

        Vue.component(
            componentName,
            componentElement.default
        );
    })
  }
}