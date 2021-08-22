/**
 * https://github.com/pubkey/broadcast-channel
 * https://github.com/arnelenero/simpler-state/issues/14
 * https://simpler-state.js.org/recipe-plugins.html
 */

export const syncTabs = () => ({
  set(origInitFn: any, entity: any) {},
  init(origSetFn: any, entity: any) {},
});
