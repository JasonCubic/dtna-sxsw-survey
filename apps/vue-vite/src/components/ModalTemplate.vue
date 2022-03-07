<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-dialog">
        <ClickWatcher @click-outside="$emit('close')">
          <div class="modal-content">
            <div class="modal-header">
              <slot name="header">
                default header
              </slot>
              <span class="modal-close">
                <em class="fas fa-times" @click="$emit('close')" />
              </span>
            </div>

            <div class="modal-body">
              <slot name="body">
                default body
              </slot>
            </div>

            <div class="modal-footer">
              <slot name="footer">
                default footer
                <button class="btn btn-default" @click="$emit('close')">
                  Close
                </button>
              </slot>
            </div>
          </div>
        </ClickWatcher>
      </div>
    </div>
  </transition>
</template>

<script setup>
import ClickWatcher from './ClickWatcher.vue';

defineEmits(['close']);
</script>

<style scoped>
/*
 * https://vuejs.org/guide/built-ins/transition.html#css-based-transitions
 */
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 50%);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-content {
  transition: all 0.3s ease;
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease-out;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: translateY(-20px);
}

</style>
