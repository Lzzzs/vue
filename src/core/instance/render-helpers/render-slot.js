/* @flow */

import { extend, warn, isObject } from "core/util/index";

/**
 * Runtime helper for rendering <slot>
 */
export function renderSlot(
  name: string,
  fallback: ?Array<VNode>,
  props: ?Object,
  bindObject: ?Object
): ?Array<VNode> {
  const scopedSlotFn = this.$scopedSlots[name];
  let nodes;
  if (scopedSlotFn) {
    // 作用域插槽的处理
    // scoped slot
    props = props || {};
    if (bindObject) {
      if (process.env.NODE_ENV !== "production" && !isObject(bindObject)) {
        warn("slot v-bind without argument expects an Object", this);
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    // 直接从this.$slots取出对应slot标签的name，取出VNode，直接返回给外部渲染
    nodes = this.$slots[name] || fallback;
  }

  const target = props && props.slot;
  if (target) {
    return this.$createElement("template", { slot: target }, nodes);
  } else {
    return nodes;
  }
}
