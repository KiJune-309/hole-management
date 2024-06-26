<template>
  <a-modal v-model:visible="visibled" :title="title" @ok="handleOk" @cancel="handleCancel">
    <!-- 内容 -->
    <a-form :model="form">
      <a-form-item v-for="(item, index) in formInput" :rules="item.rules" :key="index" :label="item.label"
        :name="item.key">
        <a-input v-if="item.type === 'input'" :placeholder="item.placeholder" v-model="form[item.key]" />
        <a-select v-else-if="item.type === 'select'" :placeholder="item.placeholder" v-model="form[item.key]" />
        <a-switch v-else-if="item.type === 'switch'" v-model="form[item.key]" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useForm } from '@/hooks';
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  confirm: {
    type: Function,
    default: () => { }
  },
  cancel: {
    type: Function,
    default: () => { }
  }
})

const formInput = reactive([
  {
    label: '设置id',
    key: 'id',
    placeholder: '请输入编号',
    type: 'input',
    rules: [{ required: true, message: '请输入编号' }, { validator: this.handleCheckTpl }],
  },
  {
    label: '父级菜单',
    key: 'parentid',
    placeholder: '请输入父级菜单',
    type: 'select',
    rules: [{ required: false, message: '请输入父级id' }],
  },
  {
    label: '设置名称',
    key: 'title',
    placeholder: '请输入名称',
    type: 'input',
    rules: [{ required: true, message: '请输入名称' }],
  },
  {
    label: '设置路径',
    key: 'path',
    placeholder: '请输入路径',
    type: 'input',
    rules: [{ required: true, message: '请输入路径', match: "^\/[A-Za-z0-9\-._~!$&'()*+,;=:@%\/]*$" }],
  },
  {
    label: '设置组件',
    key: 'component',
    placeholder: '请输入组件',
    type: 'input',
    rules: [{ required: true, message: '请输入组件', match: "^(/[^/ ]*)+/?$" }],
  },
  {
    label: '重定向',
    key: 'redirect',
    placeholder: '请输入重定向',
    type: 'input',
    rules: [{ required: true, message: '请输入重定向', match: "^(/[^/ ]*)+/?$" }],
  },
  {
    label: '是否隐藏',
    key: 'hidden',
    placeholder: '请输入是否隐藏',
    type: 'switch',
    rules: [{ required: true, message: '请输入是否隐藏' }],
  },
  {
    label: '是否缓存',
    key: 'keepalive',
    placeholder: '请输入是否缓存',
    type: 'switch',
    rules: [{ required: true, message: '请输入是否缓存' }],
  },
  {
    label: '是否固定',
    key: 'affix',
    placeholder: '请输入是否固定',
    type: 'switch',
    rules: [{ required: true, message: '请输入是否固定' }],
  },
  {
    label: 'icon',
    key: 'icon',
    placeholder: '请输入icon',
    type: 'input',
    rules: [{ required: true, message: '请输入icon' }]
  },
])

const { form, resetForm } = useForm({
});
const visibled = ref(false);
const emit = defineEmits(['setVisible'])



watch(visibled, (newVal) => {
  emit('setVisible', newVal);
})

watch(props, (newVal) => {
  visibled.value = newVal.visible;
}, { deep: true })

const detailId = ref('')
const isEdit = computed(() => !!detailId.value) // 判断是新增还是编辑模式
const title = computed(() => (isEdit.value ? '编辑' : '新增'))

const handleOk = () => {
  props.confirm(form);
}

const handleCancel = () => {
  props.cancel();
}


// 表单验证
handleCheckTpl = (rule, value, callback) => {
  try {
    if (value.file) {
      if (value.file.status === 'removed') {
        callback();
      } else {
        callback();
      }
    } else {
      callback();
    }
  } catch (err) {
    callback();
  }
};
</script>
